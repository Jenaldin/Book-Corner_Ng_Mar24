import { Book } from "./book";

export interface User {
   _id?: string;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   password: string;
   avatar?: string;
   booksOwned?: Book[];
   booksLeased?: Book[];
   booksRented?: Book[];
   __v?: number;
}