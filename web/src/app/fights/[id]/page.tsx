import { getFight } from "@/app/actions";
import {
  FightDetailsCard,
  FakeFightDetailsCard,
  getCoordinatesFromAddress,
} from "@/components/fight-card";
import StaticMap from "@/components/static-map";
import { H1 } from "@/components/typograhpy";
import { Suspense } from "react";

export default async function FightDetails({
  params,
}: {
  params: { id: number };
}) {
  const fight = await getFight(params.id);
  const coordinates = await getCoordinatesFromAddress(fight.address);

  return (
    <main className="flex flex-col gap-6">
      <H1>Fight details</H1>
      <Suspense fallback={<FakeFightDetailsCard />}>
        <FightDetailsCard fight={fight} />
      </Suspense>
      {coordinates && (
        <StaticMap address={fight.address} coordinates={coordinates} />
      )}
    </main>
  );
}
