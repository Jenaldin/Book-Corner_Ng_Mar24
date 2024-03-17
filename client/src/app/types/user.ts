export interface User {
   _id: string;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   password: string;
   avatar: string;
   booksOwned: string[];
   booksLeased: string[];
   booksRented: string[];
   __v: number;
}