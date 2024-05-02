import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FightData } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getFight } from "@/app/actions";

export function FightCard({ fight }: { fight: FightData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fight.title}</CardTitle>
        <CardDescription>{fight.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{fight.message}</p>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Link href={"/fights/" + fight.id}>
          <Button>See details</Button>
        </Link>
        <Link href={"/fights/" + fight.id + "/update"}>
          <Button variant={"secondary"}>Update</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export async function FightDetailsCard({ fight }: { fight: FightData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{fight.title}</CardTitle>
        <CardDescription>{fight.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{fight.message}</p>
        <div className="flex flex-wrap gap-4">
          <Badge>cover: {fight.cover == true ? "yes" : "no"}</Badge>
          <Badge>fighting: {fight.fighting == true ? "yes" : "no"}</Badge>
          <Badge>fighters needed:{fight.fighters_needed}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Link href={"/fights/" + fight.id + "/update"}>
          <Button variant={"secondary"}>Update</Button>
        </Link>
        <Link href={"/fights/" + fight.id + "/delete"}>
          <Button variant={"destructive"}>Delete</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
export function FakeFightDetailsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          <div className="h-2 w-[200px] border border-border/40 bg-black rounded"></div>
        </CardTitle>
        <CardDescription>
          {" "}
          <div className="h-2 w-[500px] border border-border/40 bg-neutral-200 rounded"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="h-2 w-[700px] border border-border/40 bg-neutral-200 rounded"></div>
        <div className="flex flex-wrap gap-4">
          <Badge>cover: ?</Badge>
          <Badge>fighting: ?</Badge>
          <Badge>fighters needed: ?</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant={"secondary"}>Update</Button>
        <Button variant={"destructive"}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export async function getCoordinatesFromAddress(address: string) {
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?address_line1=${address}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  const data = await response.json();
  console.log(data);

  return data.features[0].geometry.coordinates;
}
