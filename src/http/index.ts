import axios, { AxiosError } from "axios";

const $api = axios.create({
  baseURL: import.meta.env.VITE_BONUSES_API,
  headers: {
    AccessKey: import.meta.env.VITE_AccessKey,
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
      import.meta.env.VITE_TOKEN_API,
      {
        "idClient": import.meta.env.VITE_idClient,
        "accessToken": "",
        "paramName": "device",
        "paramValue": import.meta.env.VITE_DeviceId,
        "latitude": 0,
        "longitude": 0,
        "sourceQuery": 0
      },
      {
        headers: {
          AccessKey: import.meta.env.VITE_AccessKey,
        },
      }
    );
    localStorage.setItem("token", response.data.accessToken);
  } catch (e: AxiosError | any) {
    console.log(e.message);
  }
}

export default $api;
