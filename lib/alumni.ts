export type FormerPresident = {
  id: string;
  name: string;
  serviceStart: number;
  serviceEnd: number;
  currentRole?: string;
};

export type AlumniContributor = {
  id: string;
  name: string;
  familyName: string;
  givenName: string;
  sortKey?: string;
  contribution?: string;
  currentRole?: string;
  headshot?: { src: string; alt: string };
  formerSeniorLeader: boolean;
};

// Public, verified, publication-approved records only. Keep evidence and intake private.
// This contributor directory includes current leaders; it does not imply alumni status.
// Current leadership alone does not verify former-president or former-leader status.
export const formerPresidents: readonly FormerPresident[] = [];
export const alumniContributors: readonly AlumniContributor[] = [
  {
    id: "andrew-super",
    name: "Andrew Super",
    familyName: "Super",
    givenName: "Andrew",
    currentRole: "Vice Chair, HOPE Inc. Board",
    headshot: { src: "/images/alumni/andrew-super.jpg", alt: "Andrew Super" },
    // The legend describes former leaders; only his current role is verified.
    formerSeniorLeader: false,
  },
];

const collator = new Intl.Collator("en", { sensitivity: "base" });
export function sortPresidents(records: readonly FormerPresident[]) {
  return [...records].sort((a, b) => a.serviceStart - b.serviceStart || a.serviceEnd - b.serviceEnd || collator.compare(a.name, b.name));
}

export function sortContributors(records: readonly AlumniContributor[]) {
  return [...records].sort((a, b) => collator.compare(
    a.sortKey ?? `${a.familyName}, ${a.givenName}`,
    b.sortKey ?? `${b.familyName}, ${b.givenName}`,
  ) || collator.compare(a.id, b.id));
}
