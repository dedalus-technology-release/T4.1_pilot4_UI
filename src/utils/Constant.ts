const _envApiUrlProd = import.meta.env.VITE_API_URL_PROD ?? "";
const _envApiServiceD = import.meta.env.VITE_API_SERVICE_D ?? "";

// Some dev environments expose services as 0.0.0.0:PORT which is invalid
// for browser requests. Replace 0.0.0.0 with localhost so the app can call it.
export const API_URL_PROD = _envApiUrlProd.replace("0.0.0.0", "localhost");
export const API_SERVICE_D = _envApiServiceD.replace("0.0.0.0", "localhost");