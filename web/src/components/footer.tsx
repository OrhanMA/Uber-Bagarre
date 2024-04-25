import { Large, Lead, Muted, UL } from "./typograhpy";
import Link from "next/link";

const links = [
  {
    route: "about",
    text: "About",
  },
  {
    route: "rules",
    text: "Rules",
  },
  {
    route: "fighters",
    text: "Fighters",
  },
];

export default function Footer() {
  return (
    <div className="flex items-center p-4 justify-left gap-6 bottom-0 z-50 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Large>
        {" "}
        <Link href={"/"}>Uber Bagarre</Link>
      </Large>
      <div className="flex gap-4">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              className="hidden text-foreground/60 transition-colors hover:text-foreground/80 sm:block text-sm"
              href={"/" + link.route}
            >
              {link.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
