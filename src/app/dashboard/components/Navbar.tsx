"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaWarehouse } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // First sign out (clear the session)
      await signOut({ redirect: false });
      // Then redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase();
    }

    if (session?.user?.email) {
      return session.user.email[0].toUpperCase();
    }

    return "U";
  };

  return (
    <nav className="bg-blue-400 shadow-sm">
      <div className="w-full px-4">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <div className="text-xl text-white font-semibold flex space-x-2">
              <FaWarehouse className="my-auto" />
              <h1>Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center">
            {!isLoggingOut ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-white text-black">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <span className="text-white">Logging out...</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
