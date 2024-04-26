import { RulesList } from "@/components/rules-list";
import { H1, H2 } from "@/components/typograhpy";

export default function Rules() {
  return (
    <main className="flex flex-col gap-12">
      <H1>Rules</H1>
      <H2>What are the rules to follow using Uber Bagarre?</H2>
      <RulesList />
    </main>
  );
}
