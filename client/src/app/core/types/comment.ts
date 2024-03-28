import { User } from "./user";
import { Book } from "./book";

export interface Comment {
   _id?: string;
   content: string;
   rating?: number;
   helpfulYes?: number;
   helpfulNo?: number;
   votedHelpful?: string[];
   user: User;
   createdAt?: Date;
   book: Book;
   __v?: number;
}