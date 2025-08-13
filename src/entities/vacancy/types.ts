export interface IVacancy {
  title: string;
  company: string;
  link: string;
  date: string;
  salary: { amount: number; currency: string };
  contacts?: {
    telegram?: string;
    phone?: string;
    email?: string;
    url?: string;
  };
  parsedAt?: Date;
}
