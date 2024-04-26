import { H2, P, UL } from "./typograhpy";

export function RulesList() {
  return (
    <div>
      <P>
        When using Uber Bagarre, you must follow our guidelines, providing a
        loyal and safe way to get your revenge done.
      </P>
      <P>When using Uber Bagarre, you can&apos;t:</P>
      <UL>
        <li>
          Use the fighters for anything other than a pure street fight (i.e you
          can&apos;t rob a bank)
        </li>
        <li>
          Use the fighters against Uber Bagarre employees (fighters included)
        </li>
        <li>Fight against a smaller group</li>
        <li>Fight for political reasons</li>
        <li>Get your opponents by surprise: a fight must stay loyal</li>
      </UL>
      <P>
        Uber Bagarre is made for loyal fights only. Any user that break these
        rules will be banned from the platform.
      </P>
    </div>
  );
}
