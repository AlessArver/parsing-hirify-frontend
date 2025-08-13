import type { IVacancy } from "../../../entities/vacancy/types";

export const APPLY_MODAL_INITIAL_VALUES = (
  vacancyName: string,
  vacancyLink: string
) => ({
  subject: `Юсупова Алисия Анатольевна. Отклик на вакансию: ${vacancyName}`,
  body: `Добрый день!\n\nПишу для отклика на вакансию: ${vacancyName}\nСсылка на вакансию: ${vacancyLink}\nПриложила свое резюме.\n\nБуду рада сотрудничеству!`,
});

export const APPLY_MODAL_TEXT_INFO = (contacts?: IVacancy["contacts"]) => {
  if (!contacts?.email) {
    return "Отправить отклик через приложение можно только на почту. Если хотите отправить отклик, можете это сделать в ручную.";
  }
  return "После клика откроется ваша электронная почта. Текст будет автоматически подставлен в нужные поля. Приложить резюме можете в ручную.";
};
