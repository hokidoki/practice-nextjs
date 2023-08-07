import { Response } from "@/types/api";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://backend.com";
const errorLogger = (e: Error) => (console.log(e.message), Promise.reject(e));
const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.response.use((res: AxiosResponse<Response<any>, any>) => {
    if (res.data.message !== "OK") return Promise.reject("NOT_OK");
    res.data = res.data.data;
    return res;
}, errorLogger)

export const GET = <T>(url: string, option?: AxiosRequestConfig): Promise<T> => instance.get(url, option).then((v) => v.data);
export const POST = <T, F = any>(url: string, data: F, option?: AxiosRequestConfig): Promise<T> => instance.post(url, data, option).then((v) => v.data);
export const DELETE = <T>(url: string, option?: AxiosRequestConfig): Promise<T> => instance.delete(url, option).then((v) => v.data);
export const PUT = <T, F = any>(url: string, data: F, option?: AxiosRequestConfig): Promise<T> => instance.put(url, data, option).then((v) => v.data);

export default instance;

