import { User } from "./user";

export interface Book {
   _id: string;
   title: string;
   genre: string;
   coverUrl: string;
   bookLang: string;
   description: string;
   yearPublished: number;
   pagesLong: number;
   averageRating: number;
   createdDate: string;
   owner: User;
   isRented: boolean;
   rentedBy: User;
   rentedOn: string;
   leaseRequests: string[];
   comments: string[];
   __v: number;
}