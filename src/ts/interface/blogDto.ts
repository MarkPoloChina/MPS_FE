import type { TagDto } from "./tagDto";

export interface BlogDto {
  id: number;
  type: string;
  title: string;
  target: string;
  imgTarget?: string;
  fileDate: Date;
  tags: TagDto[];
  updateDate: Date;
  createDate: Date;
}
