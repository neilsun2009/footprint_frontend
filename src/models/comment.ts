import { User } from './user';
import { Match } from './match';
export class Comment {
  _id?: string;
  _user?: User | string;
  _match: Match| string;
  commentType: string; // forecast, chat, postmatch, picture
  star?: number;
  submitTime?: Date;
  lastModifiedTime?: Date;
  text: string;
  color?: string;
  images?: string[];
  isDeleted?: boolean;
}
