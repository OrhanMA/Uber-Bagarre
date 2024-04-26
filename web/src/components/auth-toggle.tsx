"use client";

import * as React from "react";
import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthToggle({ authenticated }: { authenticated: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <User className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {authenticated ? (
          <>
            <Link href={"/logout"}>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/signin"}>
              <DropdownMenuItem>Sign in</DropdownMenuItem>
            </Link>
            <Link href={"/signup"}>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
