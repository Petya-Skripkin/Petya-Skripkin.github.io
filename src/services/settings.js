import axios from "axios";
import md5 from "md5";
import rateLimit from 'axios-rate-limit';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const formattedDate = `${year}${month}${day}`;


const http = rateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 5000,
});

export async function axiosQuery(data) {
  return http
    .post(
      "https://api.valantis.store:41000/",
      { ...data },
      {
        headers: {
          "X-Auth": md5(`Valantis_${formattedDate}`),
        },
      }
    )
    .then((e) => e.data)
    .catch((e) => {
      console.error(e);
    });
}
