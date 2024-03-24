import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getBooks(start: number, end: number) {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/catalog?start=${start}&end=${end}`);
  }

  getTotalBooks(){
    const { apiUrl } = environment;
    return this.http.get<number>(`${apiUrl}/catalog/total`)
  }

  getLatestBooks(){
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/catalog/latest`)
  }

  getBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/catalog/${id}`);
  };

  searchBooks(title: string, author: string, genre: string, owner: string) {
    const { apiUrl } = environment;
    //return this.http.get<Book[]>(`${apiUrl}/catalog?start=${start}&end=${end}`);
  }

  addBook(title: string, author: string, genre: string, coverUrl: string, bookLang: string, description: string) {
    const { apiUrl } = environment;
    const payload = { title, author, genre, coverUrl, bookLang, description}; 

    return this.http.post<Book>(`${apiUrl}/catalog`, payload, {withCredentials: true});
  };

  editBook(id: string, updatedFields: any) {
    const { apiUrl } = environment;
    return this.http.put<Book>(`${apiUrl}/catalog/${id}`, updatedFields, {withCredentials: true});
  }

  deleteBook(id: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/catalog/${id}`, {withCredentials: true});
  };
}
