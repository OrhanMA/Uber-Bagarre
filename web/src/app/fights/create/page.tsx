import { H1, H2 } from "@/components/typograhpy";

import CreateFightForm from "@/components/create-fight-form";
import Head from "next/head";
import Script from "next/script";
export default function Create() {
  return (
    <main className="flex flex-col">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      ></Script>

      <H1 className="mb-8">Create a fight request</H1>
      <H2 className="mb-10">
        Uber Bagarre will help you get your revenge done{" "}
        <span className="italic underline">the loyal way</span>.
      </H2>
      <CreateFightForm />
    </main>
  );
}
