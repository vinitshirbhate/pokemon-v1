import { Button } from "@/components/ui/button";
import Link from "next/link";
import PokemonCard from "./pokemon-card";

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
        <PokemonCard key={pokemon.id} pokemon={pokemon} ourCollection={true} />
      ))}
    </div>
  );
}
