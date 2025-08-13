import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../shared/configs/db/database";
import type { IVacancy } from "./types";

export async function listVacancies({
  contactFilter,
  page,
  pageSize,
}: {
  contactFilter?: Array<keyof NonNullable<IVacancy["contacts"]>>;
  page: number;
  pageSize: number;
}) {
  const offset = Math.max(0, (page - 1) * pageSize);

  if (!contactFilter?.length) {
    const total = await db.vacancies.count();
    const safeOffset = Math.min(offset, Math.max(0, total - pageSize));
    const items = await db.vacancies
      .orderBy("parsedAt")
      .offset(safeOffset)
      .limit(pageSize)
      .toArray();
    return { total, items };
  }

  const keyPaths = contactFilter.map((f) => `contacts.${f}` as const);
  const linkLists = await Promise.all(
    keyPaths.map((kp) => db.vacancies.where(kp).notEqual("").primaryKeys())
  );
  const links = Array.from(new Set(linkLists.flat())).sort();
  const total = links.length;

  if (total === 0) return { total: 0, items: [] };

  const safeOffset = Math.min(offset, Math.max(0, total - pageSize));
  // const pageLinks = links.slice(safeOffset, safeOffset + pageSize);

  const allItems = (await db.vacancies.bulkGet(links)).filter(
    Boolean
  ) as IVacancy[];
  allItems.sort((a, b) => {
    if (!a?.parsedAt || !b?.parsedAt) return 0;
    return new Date(b.parsedAt).getTime() - new Date(a.parsedAt).getTime();
  });

  const items = allItems.slice(safeOffset, safeOffset + pageSize);

  return { total, items };
}

export function useVacanciesList({
  contactFilter,
  page,
  pageSize,
}: {
  contactFilter?: Array<keyof NonNullable<IVacancy["contacts"]>>;
  page: number;
  pageSize: number;
}) {
  const contactKey = contactFilter ? [...contactFilter].sort().join(",") : "";
  return useLiveQuery(
    () => listVacancies({ contactFilter, page, pageSize }),
    [contactKey, page, pageSize],
    { total: 0, items: [] as IVacancy[] }
  );
}

export async function setVacancies(
  payload: IVacancy[] | null | ((prev: IVacancy[] | null) => IVacancy[] | null)
): Promise<void> {
  const prev =
    typeof payload === "function" ? await db.vacancies.toArray() : null;
  const next = typeof payload === "function" ? payload(prev) : payload;

  if (next === null) {
    await db.vacancies.clear();
    return;
  }

  const rows = next.map((v) => {
    const c = v.contacts
      ? {
          telegram: v.contacts.telegram?.trim() || undefined,
          phone: v.contacts.phone?.trim() || undefined,
          email: v.contacts.email?.trim() || undefined,
          url: v.contacts.url?.trim() || undefined,
        }
      : undefined;
    return {
      ...v,
      parsedAt: v.parsedAt ?? new Date(),
      contacts: c,
    } as IVacancy;
  });
  await db.vacancies.bulkPut(rows);
}
