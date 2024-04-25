// Server components, le fetch est donc fait côté serveur pour cette page / route

import { H1, P } from "@/components/typograhpy";
import FighterList from "@/components/fighter-list";
import { Suspense } from "react";
import { FakeFighterList } from "@/components/fake-fighter-list";

export default async function Fighters() {
  return (
    <div>
      <H1>Our fighters</H1>
      <Suspense fallback={<FakeFighterList />}>
        {/* @ts-expect-error Server Component */}
        <FighterList />
      </Suspense>
    </div>
  );
}
