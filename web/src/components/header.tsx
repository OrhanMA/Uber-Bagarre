import { AuthToggle } from "./auth-toggle";
import { ModeToggle } from "./dark-mode-toggle";
import { Nav as NavigationMenu } from "./navigation-menu";
import Link from "next/link";
import { Large } from "./typograhpy";

export default function Header() {
  const authenticated = false;
  return (
    <header className="flex items-center p-4 justify-between sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Large className="hidden sm:flex">
        <Link href={"/"}>Uber Bagarre</Link>
      </Large>
      <NavigationMenu />
      <div className="flex gap-2">
        <ModeToggle />
        {!authenticated && <AuthToggle />}
      </div>
    </header>
  );
}
