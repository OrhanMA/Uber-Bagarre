import { H1, H2 } from "@/components/typograhpy";
import { getFights } from "../actions";
import { FightData } from "@/types";
import { FightCard } from "@/components/fight-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HydraPagination from "@/components/pagination";
export default async function Fights({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  // const data = await getUserFights();
  const page = searchParams.page || "1";
  const data = await getFights(page);
  console.log(data);

  const fights = data["hydra:member"];

  return (
    <main className="flex flex-col">
      <H1>Fights</H1>
      <div className="flex flex-col gap-6 my-12">
        {fights.length > 0 ? (
          <>
            {fights.map((fight: FightData) => {
              return <FightCard key={fight.id} fight={fight} />;
            })}
            <HydraPagination
              hydraView={data["hydra:view"]}
              target="fights"
              pageSliceOffset={17}
            />
          </>
        ) : (
          <>
            <H2>You do not have any fight requests yet</H2>
            <Link href={"/fights/create"}>
              <Button>Create a fight request</Button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
