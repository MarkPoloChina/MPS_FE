import type { IllustTodayDto } from "@/ts/interface/illustTodayDto";
import { RemoteBaseDto } from "@/ts/interface/remoteBaseDto";
import axios from "axios";

const ax = axios.create({ baseURL: import.meta.env.VITE_BASE_API });

export class API {
  static getVersion = async (): Promise<string> => {
    const resp = await ax.get("/version");
    return resp.data;
  };

  static getDate = async (): Promise<string> => {
    const resp = await ax.get("/date");
    return resp.data;
  };

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

  static getRemoteBase = async (name: string): Promise<RemoteBaseDto> => {
    const resp = await ax.get(`/illust-today/remote-base/${name}`);
    return resp.data;
  };
}
