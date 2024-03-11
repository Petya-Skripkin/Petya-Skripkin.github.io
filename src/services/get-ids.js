import { appUrl } from "./app-url";
import { axiosQuery } from "./settings";

export async function getIds() {
  return await axiosQuery({
    action: "get_ids",
    params: { offset: (appUrl.searchParams.get("page") * 50), limit: 50 },
  });
}
