import { BlogDto } from "./blogDto";

export interface TagDto {
  id: number;
  level: number;
  name: string;
  blogs: BlogDto[];
  children: TagDto[];
  parent: TagDto;
}
