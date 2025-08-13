import type { IVacancy } from "../entities/vacancy/types";
import {
  GRAGE_TYPES,
  REMOTE_TYPES,
  SPECIALIZATIONS,
  VACANCY_LANGUAGES,
  WORK_FORMATS,
} from "./constants";

// Soon
export type WorkFormatType = (typeof WORK_FORMATS)[number];
export type RemoteType = (typeof REMOTE_TYPES)[number];
// Son

export type GradeType = (typeof GRAGE_TYPES)[number];
export type SpecializationType = (typeof SPECIALIZATIONS)[number];
export type VacancyLanguageType = (typeof VACANCY_LANGUAGES)[number];

export interface ILaunchHirifyParsingParams {
  page?: number;
  grade?: GradeType[];
  specializations?: SpecializationType[];
  vacancy_language?: VacancyLanguageType;
}
export interface ILaunchHirifyParsingResponse {
  success: boolean;
  vacancies: IVacancy[];
  pages: number;
  page: number;
  total_found: number;
  url_used: string;
}
