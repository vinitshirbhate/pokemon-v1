import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PokemonCollection({ pokemons, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Your collection is empty</h3>
        <p className="text-gray-500 mb-4">
          Start adding Pokémon to your collection
        </p>
        <Link href="/explore">
          <Button>Explore Pokémon</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardHeader className="p-4 bg-gray-50 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="capitalize">{pokemon.name}</CardTitle>
              <Badge variant="outline" className="mt-1 capitalize">
                {pokemon.type}
              </Badge>
            </div>
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
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative h-48 w-full mb-4 bg-gray-100 rounded-md">
              <Image
                src={pokemon.image || "/placeholder.svg"}
                alt={pokemon.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Level: <span className="font-semibold">{pokemon.level}</span>
              </div>
              <div className="text-sm text-gray-500">
                ID: #{pokemon.id.toString().padStart(3, "0")}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-50 flex justify-between">
            <Link href={`/pokemon/${pokemon.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Link href={`/trade/new?pokemon=${pokemon.id}`}>
              <Button size="sm">Offer Trade</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
