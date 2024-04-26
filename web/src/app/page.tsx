import FounderQuote from "@/components/founder-quote";
import { H1, H2, H3 } from "@/components/typograhpy";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="w-full text-center mt-4 mb-8">Uber Bagarre</H1>
      <H2>
        Uber Bagarre is the place to get your revenge done{" "}
        <span className="italic underline">the loyal way</span>.
      </H2>
      <div className="w-full flex justify-center my-10">
        <Image
          src={"/images/fight-painting.avif"}
          alt="A fight painting by Mitch Hodge"
          width={500}
          height={367.6}
          className="w-4/5 h-auto md:w-4/5 lg:w-2/3 lg:max-w-[700px] object-cover"
          // style={{ objectFit: "cover" }}
          priority={true}
        ></Image>
      </div>

      <div className="mt-8">
        <p>This is how CEO John Doe describes his vision for Uber Bagarre:</p>
        <FounderQuote />
      </div>
    </main>
  );
}
