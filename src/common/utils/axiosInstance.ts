import axios from "axios";
import Swal from "sweetalert2";
import qs from "qs";

const baseURL = `${process.env.REACT_APP_SERVER_URL}`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 3000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

axiosInstance.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    const jwtToken = localStorage.getItem("jwtToken");
    request.headers["Authorization"] = jwtToken ? `Bearer ${jwtToken}` : "";
    return request;
  },
  (error) => error
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response.status;
    const statusText = error.response.statusText;
    const message = error.response.data.message;

    switch (statusCode) {
      case 400:
        Swal.fire({
          icon: "error",
          title: `${statusCode} ${statusText}`,
          text: `${message}`,
        });
        break;
      case 401:
        Swal.fire({
          title: "Sign in again [token timeout]",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("userInfo");
          window.location.href = "/";
        });
        break;
      case 403:
        Swal.fire({
          icon: "error",
          title: `${statusCode} ${statusText}`,
          text: `${message}`,
        });
        break;
      case 404:
        Swal.fire({
          icon: "error",
          title: `${statusCode} ${statusText}`,
          text: `${message}`,
        });
        break;
      case 500:
        Swal.fire({
          icon: "error",
          title: `${statusCode} ${statusText}`,
          text: `${message}`,
        });
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
