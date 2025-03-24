"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User, Search } from "lucide-react";

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/trade/propose?pokemon=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo and Menu Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-full bg-red-500 p-5"></div>
            <span className="font-bold text-xl hidden md:inline">
              PokéTrade
            </span>
          </Link>
        </div>

        {/* Nav and Search Form */}
        <div className="flex items-center gap-4">
          <nav
            className={`absolute top-full left-0 w-full bg-white border-b border-gray-200 md:static md:border-0 md:w-auto md:bg-transparent md:flex ${
              isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 gap-4">
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Explore
                </Link>
              </li>
              {/* Search Button */}
            </ul>
          </nav>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pokémon..."
              className="border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
