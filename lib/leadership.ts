export type LeaderAffiliation = 'hope-inc-board' | 'hope-inc-executive' | 'hope-student-org';

export interface Leader {
  _id: string;
  name: string;
  title: string;
  affiliation: LeaderAffiliation;
  bio: string;
  order: number;
  headshotUrl?: string;
}

// Existing About page role summaries from the approved content packet.
// These are also the proposed initial CMS records; no invented biographies or photos.
export const fallbackLeaders: readonly Leader[] = [
  { _id: 'leader-abby-herschman', name: 'Abby Herschman', title: 'Chair, H.O.P.E. Inc. Board of Directors', affiliation: 'hope-inc-board', order: 0, bio: 'Provides board leadership and governance oversight for H.O.P.E. Inc., supporting the nonprofit’s long-term mission and organizational continuity.' },
  { _id: 'leader-andrew-super', name: 'Andrew Super', title: 'Vice Chair, H.O.P.E. Inc. Board of Directors', affiliation: 'hope-inc-board', order: 1, bio: 'Serves as Vice Chair of the Board, contributing to nonprofit oversight, organizational continuity, and support for H.O.P.E.’s mission.' },
  { _id: 'leader-ashley-turner', name: 'Ashley Turner', title: 'Board Director, Logistics', affiliation: 'hope-inc-board', order: 2, bio: 'Serves on the H.O.P.E. Inc. Board of Directors with a focus on logistics and organizational support.' },
  { _id: 'leader-matthew-yvon', name: 'Matthew Yvon', title: 'Chief Executive Officer, H.O.P.E. Inc.', affiliation: 'hope-inc-executive', order: 3, bio: 'Leads H.O.P.E. Inc.’s executive operations, helping coordinate the nonprofit’s resources, activities, and organizational development.' },
  { _id: 'leader-trinity-oglesby', name: 'Trinity Oglesby', title: 'President, H.O.P.E. Student Organization at USC', affiliation: 'hope-student-org', order: 4, bio: 'Leads the university-based student organization, where students organize, train, recruit, and carry out much of H.O.P.E.’s hands-on project work.' },
];

/** Validate CMS fields and return leaders ordered by display order, name, then ID. */
export function normalizeLeaders(records: unknown): Leader[] {
  if (!Array.isArray(records)) return [];
  return records.flatMap((record): Leader[] => {
    if (!record || typeof record !== 'object') return [];
    const { _id, name, title, affiliation, bio, order, headshotUrl } = record;
    if (typeof _id !== 'string' || typeof name !== 'string' || !name.trim() ||
      typeof title !== 'string' || !title.trim() ||
      !['hope-inc-board', 'hope-inc-executive', 'hope-student-org'].includes(affiliation)) return [];
    return [{ _id, name, title, affiliation, bio: typeof bio === 'string' ? bio : '',
      order: typeof order === 'number' && Number.isFinite(order) ? order : 0,
      ...(typeof headshotUrl === 'string' && headshotUrl.startsWith('https://cdn.sanity.io/images/') ? { headshotUrl } : {}),
    }];
  }).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name) || a._id.localeCompare(b._id));
}

/** Preserve the approved static profiles when CMS reads fail or yield no valid leaders. */
export async function resolveLeadership(load: () => Promise<unknown>): Promise<readonly Leader[]> {
  try {
    const records = normalizeLeaders(await load());
    return records.length ? records : fallbackLeaders;
  } catch {
    return fallbackLeaders;
  }
}
