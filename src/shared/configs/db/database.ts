import Dexie, { type Table } from "dexie";
import type { IVacancy } from "../../../entities/vacancy/types";

const DB_NAME = "app-db";
const DB_VERSION = 1;

export const db = new Dexie(DB_NAME) as Dexie & {
  vacancies: Table<IVacancy, string>;
};
db.version(DB_VERSION).stores({
  vacancies:
    "link,parsedAt,title,contacts.telegram,contacts.email,contacts.phone,contacts.url",
});
