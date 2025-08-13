import type {
  GradeType,
  SpecializationType,
  VacancyLanguageType,
} from "../../types";

export interface IHirifyForm {
  page?: number;
  grade?: GradeType[];
  specializations?: SpecializationType[];
  vacancy_language?: VacancyLanguageType;
}
