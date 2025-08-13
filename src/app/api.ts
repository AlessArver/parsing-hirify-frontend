import type {
  ILaunchHirifyParsingParams,
  ILaunchHirifyParsingResponse,
} from "./types";

export const launchHirifyParsing = async (
  params: ILaunchHirifyParsingParams
): Promise<ILaunchHirifyParsingResponse> => {
  // for (let p in params) {
  //   if (params[p] === undefined) {
  //     delete params[p];
  //   }
  // }

  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const res = await fetch(`/api/parse-vacancies?${query}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return (await res.json()) as ILaunchHirifyParsingResponse;
};

export const applyByEmail = async (payload: string) => {
  const res = await fetch(`/api/send-email`, { method: "POST", body: payload });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return (await res.json()) as { detail: "ok" };
};
