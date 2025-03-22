"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Fetch a larger set of Pokémon for the explore page
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default,
              level: Math.floor(Math.random() * 100) + 1,
              type: details.types[0].type.name,
              rarity: ["Common", "Uncommon", "Rare", "Epic", "Legendary"][
                Math.floor(Math.random() * 5)
              ],
              owner: `Trainer${Math.floor(Math.random() * 100) + 1}`,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto p-4 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Explore Pokémon</h1>
            <p className="text-gray-500">
              Discover Pokémon from trainers around the world
            </p>
          </div>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Pokémon or trainer..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemons.map((pokemon) => (
              <Card
                key={pokemon.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-4 bg-gray-50">
                  <CardTitle className="capitalize">{pokemon.name}</CardTitle>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="capitalize">
                      {pokemon.type}
                    </Badge>
                    <Badge
                      className={
                        pokemon.rarity === "Common"
                          ? "bg-gray-500"
                          : pokemon.rarity === "Uncommon"
                          ? "bg-green-500"
                          : pokemon.rarity === "Rare"
                          ? "bg-red-500"
                          : pokemon.rarity === "Epic"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                      }
                    >
                      {pokemon.rarity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative h-40 w-full mb-4 bg-gray-100 rounded-md">
                    <Image
                      src={pokemon.image || "/placeholder.svg"}
                      alt={pokemon.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Level:{" "}
                      <span className="font-semibold">{pokemon.level}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Owner:{" "}
                      <span className="font-semibold">{pokemon.owner}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 flex justify-between">
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/trade/propose?pokemon=${pokemon.id}`}>
                    <Button size="sm">Propose Trade</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
