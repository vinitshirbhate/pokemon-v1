"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function PokemonCard({ pokemon }) {
  const [isPending, setIsPending] = useState(false);

  const handleTrade = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to trade Pokemon");
      return;
    }

    setIsPending(true);

    setTimeout(() => {
      alert(`Successfully initiated trade for ${pokemon.name}!`);
      setIsPending(false);
    }, 2000);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <CardHeader className="p-4 bg-gray-50">
        <CardTitle className="capitalize text-center">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative h-40 w-full mb-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-sm text-gray-500 mb-2">Owner: {pokemon.owner}</div>
        <div className="text-lg font-bold">{pokemon.price} ETH</div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50">
        <Button
          className="w-full bg-red-500 hover:bg-red-600"
          onClick={handleTrade}
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Trade Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
