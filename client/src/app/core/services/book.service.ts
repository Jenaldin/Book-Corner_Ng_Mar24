import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from '../types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(start: number, end: number) {
    const { apiUrl } = environment;
    return this.http.get<{ books: Book[]; total: number }>(
      `${apiUrl}/catalog?start=${start}&end=${end}`,
    );
  }

  getLatestBooks() {
    const { apiUrl } = environment;
    return this.http.get<Book[]>(`${apiUrl}/catalog/latest`);
  }

  searchBooks(title: string, author: string, genre: string, owner: string) {
    const { apiUrl } = environment;
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (author) {
      params = params.set('author', author);
    }
    if (genre) {
      params = params.set('genre', genre);
    }
    if (owner) {
      params = params.set('owner', owner);
    }

    return this.http.get<Book[]>(`${apiUrl}/catalog/search`, { params });
  }

  getBook(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Book>(`${apiUrl}/catalog/${id}`);
  }

  addBook(
    title: string,
    author: string,
    genre: string,
    averageRating: number,
    coverUrl: string,
    bookLang: string,
    description: string,
  ) {
    const { apiUrl } = environment;
    const payload = {
      title,
      author,
      genre,
      averageRating,
      coverUrl,
      bookLang,
      description,
    };

    return this.http.post<Book>(`${apiUrl}/catalog`, payload, {
      withCredentials: true,
    });
  }

  editBook(id: string, updatedFields: any) {
    const { apiUrl } = environment;
    return this.http.put<Book>(`${apiUrl}/catalog/${id}`, updatedFields, {
      withCredentials: true,
    });
  }

  requestBook(id: string, userId: string, isRented: boolean) {
    const { apiUrl } = environment;
    const payload = { userId, isRented };
    return this.http.put<Book>(`${apiUrl}/catalog/requestSub/${id}`, payload, {
      withCredentials: true,
    });
  }

  cancelRequest(id: string, userId: string) {
    const { apiUrl } = environment;
    const payload = { userId };
    return this.http.put<Book>(`${apiUrl}/catalog/cancelSub/${id}`, payload, {
      withCredentials: true,
    });
  }

  deleteBook(id: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/catalog/${id}`, {
      withCredentials: true,
    });
  }
}
