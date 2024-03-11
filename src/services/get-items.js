import { axiosQuery } from "./settings";

export async function getItems(ids) {
  return await axiosQuery({
    action: "get_items",
    params: { ids },
  });
}
