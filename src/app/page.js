import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white p-5"></div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            PokéTrade
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
              Register
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Featured Pokémon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <div
                key={id}
                className="bg-slate-300 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <div className="relative h-32 w-32 mb-2">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={`Pokemon ${id}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold capitalize">
                  Pokémon #{id}
                </h3>
                <p className="text-sm text-slate-500">Owned by: Trainer{id}</p>
                <Link href={`/pokemon/${id}`} className="mt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/explore">
              <Button>View All Pokémon</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
