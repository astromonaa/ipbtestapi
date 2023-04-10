import axios, { AxiosError } from "axios";

const $api = axios.create({
  baseURL: "http://84.201.188.117:5003/api/v3/ibonus/generalinfo/",
  headers: {
    AccessKey: "891cf53c-01fc-4d74-a14c-592668b7a03c",
  },
});

$api.interceptors.request.use(
  (config) => {
    config.baseURL += localStorage.getItem("token") || "";
    return config;
  },
  async (error) => {
    const requestConfig = error.config;
    if (
      error.response.status === 403 &&
      error.config &&
      !error.config.__isRetry
    ) {
      requestConfig.__isRetry = true;
      await refresh()
    }
  }
);

export async function refresh() {
  try {
    const response = await axios.post(
      "http://84.201.188.117:5021/api/v3/clients/accesstoken",
      {
        "idClient": "2c44d8c2-c89a-472e-aab3-9a8a29142315",
        "accessToken": "",
        "paramName": "device",
        "paramValue": "7db72635-fd0a-46b9-813b-1627e3aa02ea",
        "latitude": 0,
        "longitude": 0,
        "sourceQuery": 0
      },
      {
        headers: {
          AccessKey: "891cf53c-01fc-4d74-a14c-592668b7a03c",
        },
      }
    );
    localStorage.setItem("token", response.data.accessToken);
  } catch (e: AxiosError | any) {
    console.log(e.message);
  }
}

export default $api;
