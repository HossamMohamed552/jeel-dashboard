import axios from "axios";
import qs from "qs";
import store from "@/store";
import VueCookies from "vue-cookies"

axios.defaults.baseURL = process.env.VUE_APP_ADMIN_URL;
export default function ApiService({method, url, config = {},headers={}}) {
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
      locale: 'ar',
      ...headers.headers
    },
    ramsSerializer(params) {
      return qs.stringify(params, {arrayFormat: "comma"});
    },
  });
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      VueCookies.remove('token');
      store.dispatch("showToast", {
        type: "danger",
        message: error.response.data.errors,
        time:5000
      });
      store.dispatch("removeUser");
    } else if (error.response.status !== 403) {
      store.dispatch("showToast", {
        type: "danger",
        message: error.response.data.errors,
        time:5000
      });
    }
    return Promise.reject(error);
  }
);
