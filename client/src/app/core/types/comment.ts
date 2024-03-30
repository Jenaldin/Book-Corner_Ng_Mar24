import { User } from "./user";
import { Book } from "./book";

export interface Comment {
   _id?: string;
   title: string;
   body: string;
   ratedBookWith?: number;
   helpfulYes?: number;
   helpfulNo?: number;
   usersVotedHelpful?: User[];
   user: User;
   createdAt?: Date;
   book: Book;
   __v?: number;
}