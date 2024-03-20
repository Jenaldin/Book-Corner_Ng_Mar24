import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getBooks() {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/catalog`)
  };

  getBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/catalog/${id}`);
  };

  addBook(title: string, genre: string, coverUrl: string, bookLang: string, description: string, owner: string) {
    const { apiUrl } = environment;
    const payload = { title, genre, coverUrl, bookLang, description, owner };

    return this.http.post<Book>(`${apiUrl}/catalog`, payload);
  };

  editBook(id: string, title: string, genre: string, coverUrl: string, bookLang: string, description: string, owner: string) {
    const { apiUrl } = environment;
    const payload = { title, genre, coverUrl, bookLang, description, owner };

    return this.http.put<Book>(`${apiUrl}/catalog/${id}`, payload);
  }

}
