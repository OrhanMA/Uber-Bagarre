import FounderQuote from "@/components/founder-quote";
import { RulesList } from "@/components/rules-list";
import {
  Blockquote,
  H1,
  H2,
  H3,
  InlineCode,
  P,
  UL,
} from "@/components/typograhpy";

export default function About() {
  return (
    <main className="flex flex-col gap-12">
      <H1>About us</H1>
      <div>
        <H2>What is Uber Bagarre?</H2>
        <P>
          Uber bagarre is an idea that founder <InlineCode>John Doe</InlineCode>{" "}
          had when witnessing injustice in street fights.
        </P>
        <P>He put it in the best way:</P>
        <FounderQuote />
        <P>
          Uber Bagarre is a service in which you can order fighters to help you
          win the fights you would have lost alone.
        </P>
      </div>
      <div>
        <H3>What makes us special?</H3>
        <P>
          We studied figths and services app to find the best compromise that
          lets you access easily to fighters in a secure and practical way.
          Getting your revenge done has never been that easy.
        </P>
      </div>
      <H3>What are the rules to follow using Uber Bagarre?</H3>
      <RulesList />
    </main>
  );
}
