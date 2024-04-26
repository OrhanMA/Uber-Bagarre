import FounderQuote from "@/components/founder-quote";
import { H1, H2, H3, Muted } from "@/components/typograhpy";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="w-full text-center mt-4 mb-8">Uber Bagarre</H1>
      <H2>
        Uber Bagarre is the place to get your revenge done{" "}
        <span className="italic underline">the loyal way</span>.
      </H2>
      <div className="w-full flex flex-col items-center justify-center my-10">
        <Image
          src={"/images/fight-painting.avif"}
          alt="A fight painting by Mitch Hodge"
          width={500}
          height={367.6}
          className="w-4/5 h-auto md:w-4/5 lg:w-2/3 lg:max-w-[700px] object-cover"
          // style={{ objectFit: "cover" }}
          priority={true}
        ></Image>
        <Muted className="mt-2">
          Photo from{" "}
          <Link
            className="underline dark:hover:text-neutral-100 hover:text-neutral-800"
            href="https://unsplash.com/fr/@kmitchhodge?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            K. Mitch Hodge
          </Link>{" "}
          on{" "}
          <Link
            className="underline dark:hover:text-neutral-100 hover:text-neutral-800"
            href="https://unsplash.com/fr/photos/femme-en-robe-bleue-tenant-un-cheval-blanc-wjqFQQQdIe4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Unsplash
          </Link>
        </Muted>
      </div>

      <div className="mt-8">
        <p>This is how CEO John Doe describes his vision for Uber Bagarre:</p>
        <FounderQuote />
      </div>
    </main>
  );
}
