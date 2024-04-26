import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { P } from "./typograhpy";
import { getFighters } from "@/app/actions";
import { FigtherInterface } from "@/types";

export default async function FighterList() {
  // const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));
  // await sleep(3000);
  const data: any = await getFighters();
  console.log(data);

  const fighters: FigtherInterface[] = data["hydra:member"];
  console.log(fighters);

  return (
    <Card className="mt-10">
      <CardHeader className="px-7">
        <CardTitle className="mb-2">Fighters</CardTitle>
        <CardDescription>A list of our available fighters.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">Skills</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fighters.map((fighter) => {
              return (
                <TableRow className="hover:bg-accent" key={fighter.id}>
                  <TableCell>
                    <div className="font-medium">{fighter.name}</div>
                    {/* <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div> */}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {fighter.description}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      className="text-xs w-[100px] flex justify-center"
                      variant="default"
                    >
                      {fighter.skills.map((skill: any, index) => {
                        return (
                          <P className="truncate" key={index}>
                            {skill.name}
                          </P>
                        );
                      })}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
