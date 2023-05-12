import axios from "axios";
import qs from "qs";
import store from "@/store";
import VueCookies from "vue-cookies"
axios.defaults.baseURL = process.env.VUE_APP_ADMIN_API;
console.log('process.env.VUE_APP_ADMIN_API', process.env.VUE_APP_ADMIN_API)
// console.log('axios.defaults.baseURL', axios.defaults.baseURL)
export default function ApiService({ method, url, config = {} }) {
  return axios({
    method,
    url,
    data: {
      ...config.data,
    },
    params: {
      ...config.params,
    },
    headers: {
      Authorization: `Bearer ${VueCookies.get("token")}`,
    },
    ramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: "comma" });
    },
  });
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    store.dispatch("showToast", {
      type: "danger",
      message: error.response.data.errors,
    });
    if (error.response.status === 401) {
      store.dispatch("showToast", {
        type: "danger",
        message: error.response.data.errors,
      });
      store.dispatch("removeUser");
    }

    return Promise.reject(error);
  }
);
