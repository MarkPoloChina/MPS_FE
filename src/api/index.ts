import type { BlogDto } from "@/ts/interface/blogDto";
import type { IllustTodayDto } from "@/ts/interface/illustTodayDto";
import type { RemoteBaseDto } from "@/ts/interface/remoteBaseDto";
import type { TagDto } from "@/ts/interface/tagDto";
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

  static getLatestBlogs = async (): Promise<BlogDto[]> => {
    const resp = await ax.get("/blog/latest");
    return resp.data;
  };

  static getTags = async (): Promise<TagDto[]> => {
    const resp = await ax.get("/blog/tags");
    return resp.data;
  };

  static getBlogUnderTag = async (tagId: number): Promise<BlogDto[]> => {
    const resp = await ax.get(`/blog/under_tag/${tagId}`);
    return resp.data;
  };

  static getBlogById = async (blogId: number): Promise<BlogDto> => {
    const resp = await ax.get(`/blog/${blogId}`);
    return resp.data;
  };

  static getMd = async (url: string): Promise<string> => {
    const resp = await axios.get(url);
    return resp.data;
  };

  static getTag = async (tagId: number): Promise<TagDto> => {
    const resp = await ax.get(`/blog/tag/${tagId}`);
    return resp.data;
  };
}
