import { User } from './user';
export class Field {
  _id: string;
  _user: User;
  price?: string;
  seat?: string;
  companion?: string;
  isDeleted?: boolean;
}
