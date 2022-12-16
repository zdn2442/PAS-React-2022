import Cookies from "js-cookie";
import axios, { syncToken } from "./base_url";

export function loginProses(payload) {
  return axios.post(`/login`, payload);
}
export function registerProses(payload) {
  return axios.post(`/register`, payload);
}
export function authMeProses() {
  syncToken();
  return axios.get("/authme");
}
export function forPassProses(payload) {
  return axios.post(`/lupa-password`, payload);
}
export function createProses(id,token, payload) {
  return axios.post(`/reset-password/${id}/${token}`, payload);
}