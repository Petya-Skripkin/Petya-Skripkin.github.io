import { axiosQuery } from "./settings";

export async function getFields() {
  return await axiosQuery({
    action: "get_fields",
    params: { field: "brand" },
  });
}
