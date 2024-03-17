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
    return this.http.get<Book[]>(`${apiUrl}/books`)
  }

}
