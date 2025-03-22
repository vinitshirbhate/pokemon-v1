"use client";

import { useState, useEffect } from "react";
import PokemonCard from "@/components/pokemon-card";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // In a real app, this would fetch from your API or blockchain
        // For demo purposes, we'll fetch from the Pokemon API
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=8"
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
              price: (Math.random() * 0.1).toFixed(4),
              owner: `0x${Math.random()
                .toString(16)
                .slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
