import type { IllustTodayDto } from "@/ts/interface/illustTodayDto";
import axios from "axios";

const ax = axios.create({ baseURL: import.meta.env.VITE_BASE_API });

export class API {
  static getIllustToday = async (date: string): Promise<IllustTodayDto> => {
    const resp = await ax.get(`/illust-today/${date}`);
    return resp.data;
  };

  static getIllustTodayLatest = async (): Promise<IllustTodayDto> => {
    const resp = await ax.get(`/illust-today/latest`);
    return resp.data;
  };

  static getIllustTodayPre = async (date: string): Promise<IllustTodayDto> => {
    const resp = await ax.get(`/illust-today/pre/${date}`);
    return resp.data;
  };

  static getIllustTodayNext = async (date: string): Promise<IllustTodayDto> => {
    const resp = await ax.get(`/illust-today/next/${date}`);
    return resp.data;
  };
}
