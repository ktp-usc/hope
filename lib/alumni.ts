export type FormerPresident = {
  id: string;
  name: string;
  serviceStart: number;
  serviceEnd: number;
  currentRole?: string;
  displayTerm?: string;
  roleOrContribution?: string;
  headshot?: { src: string; alt: string };
  linkedInUrl?: string;
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
  yearsActive?: string;
  linkedInUrl?: string;
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

export type AlumniMember = {
  headshot?: { src: string; alt: string };
  _id: string;
  name: string;
  yearsActive?: string;
  isFormerPresident: boolean;
  presidentTerm?: string;
  isExecutiveLeader: boolean;
  roleOrContribution?: string;
  linkedInUrl?: string;
};

/** Parse only explicit editor-supplied years; never infer a term from yearsActive. */
export function parsePresidentTerm(value: unknown) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^(\d{4})(?:\s*(?:[-–—/]|to)\s*(\d{4}|present))?$/i);
  if (!match) return null;
  const start = Number(match[1]);
  const end = match[2]?.toLowerCase() === 'present' ? Infinity : Number(match[2] ?? match[1]);
  return end >= start ? { start, end } : null;
}

export function isLinkedInUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
      (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com'));
  } catch {
    return false;
  }
}

/** Only Sanity image CDN URLs are accepted for CMS headshots. */
export function isSanityImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'cdn.sanity.io' &&
      !url.username && !url.password && !url.port && url.pathname.startsWith('/images/');
  } catch { return false; }
}

export function normalizeAlumniMembers(records: unknown): AlumniMember[] {
  if (!Array.isArray(records)) return [];
  return records.flatMap((record): AlumniMember[] => {
    if (!record || typeof record !== 'object' || typeof record._id !== 'string' ||
      typeof record.name !== 'string' || !record.name.trim()) return [];
    return [{
      _id: record._id, name: record.name,
      yearsActive: typeof record.yearsActive === 'string' ? record.yearsActive : undefined,
      isFormerPresident: record.isFormerPresident === true,
      presidentTerm: typeof record.presidentTerm === 'string' ? record.presidentTerm : undefined,
      isExecutiveLeader: record.isExecutiveLeader === true,
      roleOrContribution: typeof record.roleOrContribution === 'string' ? record.roleOrContribution : undefined,
      headshot: typeof record.headshotUrl === 'string' && isSanityImageUrl(record.headshotUrl)
        ? { src: record.headshotUrl, alt: typeof record.headshotAlt === 'string' && record.headshotAlt.trim()
          ? record.headshotAlt.trim() : `Portrait of ${record.name.trim()}` } : undefined,
      linkedInUrl: isLinkedInUrl(record.linkedInUrl) ? record.linkedInUrl : undefined,
    }];
  });
}

export const fallbackAlumniDirectory = {
  presidents: formerPresidents,
  contributors: alumniContributors,
};

export function alumniDirectoryFromMembers(members: readonly AlumniMember[]) {
  const presidents = members.flatMap((person): FormerPresident[] => {
    const term = person.isFormerPresident ? parsePresidentTerm(person.presidentTerm) : null;
    if (!term) return [];
    return [{ id: person._id, name: person.name, serviceStart: term.start, serviceEnd: term.end,
      displayTerm: person.presidentTerm, roleOrContribution: person.roleOrContribution,
      linkedInUrl: person.linkedInUrl, headshot: person.headshot }];
  });
  const contributors = members.map((person): AlumniContributor => ({
    id: person._id, name: person.name,
    // The CMS provides one approved display name, not separate family/given names.
    // Sort that name directly instead of guessing how to split a person's name.
    familyName: '', givenName: person.name, sortKey: person.name,
    contribution: person.roleOrContribution, yearsActive: person.yearsActive,
    formerSeniorLeader: person.isExecutiveLeader, linkedInUrl: person.linkedInUrl,
    // Reuse an existing approved local headshot only for the matching named person.
    headshot: person.headshot ?? alumniContributors.find((approved) => collator.compare(approved.name, person.name.trim()) === 0)?.headshot,
  }));
  return { presidents: sortPresidents(presidents), contributors: sortContributors(contributors) };
}

export async function resolveAlumniDirectory(load: () => Promise<unknown>) {
  try {
    const records = normalizeAlumniMembers(await load());
    return records.length ? alumniDirectoryFromMembers(records) : fallbackAlumniDirectory;
  } catch {
    return fallbackAlumniDirectory;
  }
}
