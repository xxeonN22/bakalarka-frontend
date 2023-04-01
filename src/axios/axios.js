// Naimportovany balicek pre spracovanie requestov
import axios from "axios";

// Globalne nastavenie - URL serveru a nastavenie aby sa posielali cookies
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
