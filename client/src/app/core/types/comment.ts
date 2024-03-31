import { User } from "./user";
import { Book } from "./book";

export interface Comment {
   _id?: string;
   title: string;
   commentBody: string;
   ratedBookWith?: number;
   helpfulYes?: number;
   helpfulNo?: number;
   usersVotedHelpful?:string[];
   user: User;
   createdAt?: Date;
   book: Book;
   __v?: number;
}