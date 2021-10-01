import qs from "qs";

export function prepareQueryString(params) {
  const updParams = Object.keys(params)
    .filter((key) => params[key] !== null)
    .reduce((acc, cur) => ({ ...acc, [cur]: params[cur] }), {});

  return qs.stringify(updParams, { encode: false, arrayFormat: "brackets" });
}

export function parseQueryString(queryString) {
  return qs.parse(queryString, { ignoreQueryPrefix: true });
}
