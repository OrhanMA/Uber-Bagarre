import { getFight } from "@/app/actions";
import { H1 } from "@/components/typograhpy";
import UpdateFightForm from "@/components/update-fight-form";

import Head from "next/head";
import Script from "next/script";

export default async function UpdateFight({
  params,
}: {
  params: { id: number };
}) {
  const fight = await getFight(params.id);
  return (
    <main>
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
      <H1>Update fight</H1>
      <UpdateFightForm fight={fight} />
    </main>
  );
}
