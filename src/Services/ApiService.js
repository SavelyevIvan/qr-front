import { notification } from "antd";
import { prepareQueryString } from "../Utils/queryString";
import AuthService from "./AuthService";
import tokenService from "./TokenService";

const CONTENT_TYPE_JSON = "application/json";

class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  getApiLink(path, params) {
    return (
      this.apiUrl + path + (params ? `?${prepareQueryString(params)}` : "")
    );
  }

  async call(
    url,
    method = "GET",
    options = {},
    params = null,
    withToken = true
  ) {
    const headers = options.headers || {
      "X-Requested-With": "XMLHttpRequest",
    };

    if (typeof options.headers === "object" && options.headers) {
      Object.entries(options.headers).forEach(([title, value]) => {
        headers[title] = value;
      });
    }

    options.headers = headers;
    options.method = method;
    // options.credentials = 'include';
    // options.mode = 'no-cors';

    if (withToken) {
      options.headers.Authorization = await tokenService.getToken();
    }

    return fetch(this.getApiLink(url, params), options)
      .then((resp) => {
        let result;
        const contentType = resp.headers.get("Content-Type");

        if (contentType && contentType.includes(CONTENT_TYPE_JSON)) {
          result = resp.json();
        } else {
          result = resp.text();
        }

        return Promise.all([result, resp.status]);
      })
      .then(([data, status]) => {
        if (status === 401) {
          AuthService.logout();
        }
        if (status >= 500 || [400, 401, 402, 403, 404, 409].includes(status)) {
          notification.open({ message: data.error });
          return Promise.reject(data.error || data);
        }
        if (status !== 200 && data.message) {
          notification.open({ message: data.message });
        }
        if (data.error) {
          return Promise.reject(data.error);
        }

        return typeof data.data === "undefined" ? data : data.data;
      });
  }

  get(url, params = null, options = {}) {
    return this.call(url, "GET", options, params);
  }

  post(url, data = null, withToken = true, options = {}) {
    if (data) {
      options.body = JSON.stringify(data);
      options.headers = {
        "Content-Type": CONTENT_TYPE_JSON,
      };
    }

    return this.call(url, "POST", options, null, withToken);
  }

  async put(url, data = null, options) {
    if (data) {
      options.body = JSON.stringify(data);
      options.headers = {
        "Content-Type": CONTENT_TYPE_JSON,
      };
    }

    return this.call(url, "PUT", options);
  }

  async upload(url, file, name) {
    const formData = new FormData();
    formData.append(name, file);

    const options = {
      body: formData,
    };

    return this.call(url, "POST", options);
  }

  delete(url) {
    return this.call(url, "DELETE");
  }
}

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

export default new ApiService(BACKEND_HOST);
