import { H1 } from "@/components/typograhpy";
import FighterList from "@/components/fighter-list";
import { Suspense } from "react";
import { FakeFighterList } from "@/components/fake-fighter-list";
import { getFighters } from "../actions";
import HydraPagination from "@/components/pagination";

export default async function Fighters({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page || "1";
  const data: any = await getFighters(page);

  return (
    <div>
      <H1>Our fighters</H1>
      <Suspense fallback={<FakeFighterList />}>
        <FighterList fighters={data["hydra:member"]} />
      </Suspense>
      <HydraPagination
        hydraView={data["hydra:view"]}
        target={"fighters"}
        pageSliceOffset={19}
      />
    </div>
  );
}
