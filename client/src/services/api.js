import axios from "axios";

/*
|--------------------------------------------------------------------------
| API BASE URL
|--------------------------------------------------------------------------
| .env me:
|
| VITE_API_URL=http://localhost:5000/api
|
| Agar VITE_API_URL nahi hai to localhost fallback use hoga.
|--------------------------------------------------------------------------
*/

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


/*
|--------------------------------------------------------------------------
| AXIOS INSTANCE
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: API_URL,

  headers: {
    Accept: "application/json",
  },

  timeout: 30000,
});


/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
| Normal JSON requests ke liye Content-Type automatically set hoga.
|
| IMPORTANT:
| FormData ke case me Content-Type manually set nahi karna hai.
| Browser khud multipart/form-data ka boundary set karega.
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    /*
    |----------------------------------------------------------------------
    | FormData Request
    |----------------------------------------------------------------------
    */

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers.common?.["Content-Type"];
    } else {
      /*
      |--------------------------------------------------------------------
      | Normal JSON Request
      |--------------------------------------------------------------------
      */

      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
|--------------------------------------------------------------------------
| API error ko consistent way me handle karne ke liye.
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    /*
    |----------------------------------------------------------------------
    | Server Response Error
    |----------------------------------------------------------------------
    */

    if (error.response) {
      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );
    }

    /*
    |----------------------------------------------------------------------
    | Network Error
    |----------------------------------------------------------------------
    */

    else if (error.request) {
      console.error(
        "API Network Error:",
        error.message
      );
    }

    /*
    |----------------------------------------------------------------------
    | Request Setup Error
    |----------------------------------------------------------------------
    */

    else {
      console.error(
        "API Request Error:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);


/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

export default api;