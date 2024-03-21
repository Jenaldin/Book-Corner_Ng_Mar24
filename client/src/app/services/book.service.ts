import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getBooks(startPage: number, endPage: number) {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/catalog?start=${startPage}&end=${endPage}`);
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

  addBook(title: string, author: string, genre: string, coverUrl: string, bookLang: string, description: string) {
    const { apiUrl } = environment;
    const payload = { title, author, genre, coverUrl, bookLang, description}; 

    return this.http.post<Book>(`${apiUrl}/catalog`, payload);
  };

  editBook(id: string, updatedFields: any) {
    const { apiUrl } = environment;
    return this.http.put<Book>(`${apiUrl}/catalog/${id}`, updatedFields);
  }

  deleteBook(id: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/catalog/${id}`);
  };
}
