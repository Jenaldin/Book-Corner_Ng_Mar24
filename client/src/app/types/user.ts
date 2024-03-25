import { Book } from "./book";

export interface User {
   _id?: string;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   password: string;
   avatar?: string;
   aboutMe?: string;
   booksOwned?: Book[];
   booksRequested?: Book[];
   __v?: number;
}

export interface UserAuth {
   id: string;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   password: string;
}

export interface UserDetailed {
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   avatar?: string;
   aboutMe?: string;
   booksOwned?: Book[];
   booksRequested?: Book[];
}