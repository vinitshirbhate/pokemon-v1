import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PokemonCard({ pokemon, ourCollection }) {
  const calculatePrice = (pokemon) => {
    const basePrice = 0.01;
    const levelMultiplier = 1 + Math.pow(pokemon.level / 10, 1.5);
    const rarityMultipliers = {
      Common: 1,
      Uncommon: 1.5,
      Rare: 2.5,
      Epic: 5,
      legendary: 10,
    };
    const rarityMultiplier =
      rarityMultipliers[pokemon.rarity.toLowerCase()] || 1.0;

    return (
      Math.round(basePrice * levelMultiplier * rarityMultiplier * 10000) / 10000
    );
  };
  return (
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
          {ourCollection ? (
            <>
              <div className="text-sm text-gray-500">
                ID: #{pokemon.id.toString().padStart(3, "0")}
              </div>
            </>
          ) : (
            <div>
              <div className="text-sm text-gray-500">{pokemon.owner}</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <div>Price: {calculatePrice(pokemon)} ETH</div>
        {/* <Link href={`/trade/new?pokemon=${pokemon.id}`}>
        </Link> */}
        <Button size="sm" onClick={() => alert("trade has been offered")}>
          Offer Trade
        </Button>
      </CardFooter>
    </Card>
  );
}
