import { User } from './user';
import { Comment } from './comment';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  bookLang: string;
  description: string;
  averageRating?: number;
  usersWhoRated?: User[];
  createdDate?: Date;
  owner: User;
  isRented?: boolean;
  requestedBy?: {
    user?: User;
    requestedOn?: Date;
  }[];
  comments?: Comment[];
  __v?: number;
}
