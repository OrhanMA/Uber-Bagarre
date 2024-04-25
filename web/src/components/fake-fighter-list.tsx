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

export function FakeFighterList() {
  const codeBlocks = Array.from({ length: 5 }, (_, index) => (
    <FakeRow key={index} />
  ));
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
          <TableBody className="animate-pulse">{codeBlocks}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const FakeRow = () => (
  <TableRow className="hover:bg-accent">
    <TableCell>
      <div className="font-medium">
        <div className="h-2 border border-border/40 bg-neutral-200 rounded"></div>
      </div>
    </TableCell>
    <TableCell className="hidden sm:table-cell">
      <div className="h-2 border border-border/40 bg-neutral-200 rounded"></div>
    </TableCell>
    <TableCell className="hidden sm:table-cell">
      <div className="h-2 border border-border/40 bg-neutral-200 rounded"></div>
    </TableCell>
  </TableRow>
);
