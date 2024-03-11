import { axiosQuery } from "./settings";

export async function filter(params) {
  return await axiosQuery({
    action: "filter",
    params,
  });
}
