import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { Comment } from '../types/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getComments(start: number, end: number, bookId: string) {
    const { apiUrl } = environment;
    return this.http.get<{ comments: Comment[]; total: number }>(
      `${apiUrl}/comment?start=${start}&end=${end}&bookId=${bookId}`,
      { withCredentials: true },
    );
  }

  addComment(
    book: string,
    title: string,
    commentBody: string,
    ratedBookWith: number,
  ) {
    const { apiUrl } = environment;
    const payload = { book, title, commentBody, ratedBookWith };

    return this.http.post<Comment>(`${apiUrl}/comment/new`, payload, {
      withCredentials: true,
    });
  }

  editComment(
    id: string,
    title: string,
    commentBody: string,
    ratedBookWith: number,
  ) {
    const { apiUrl } = environment;
    const updatedFields = {
      title: title,
      commentBody: commentBody,
      ratedBookWith: ratedBookWith,
    };
    return this.http.put<Comment>(`${apiUrl}/comment/${id}`, updatedFields, {
      withCredentials: true,
    });
  }

  deleteComment(id: string) {
    const { apiUrl } = environment;
    return this.http.delete(`${apiUrl}/comment/${id}`, {
      withCredentials: true,
    });
  }

  votedHelpfulYes(id: string, userId: string) {
    const { apiUrl } = environment;
    const payload = { userId };
    return this.http.put<Comment>(`${apiUrl}/comment/voteYes/${id}`, payload, {
      withCredentials: true,
    });
  }

  votedHelpfulNo(id: string, userId: string) {
    const { apiUrl } = environment;
    const payload = { userId };
    return this.http.put<Comment>(`${apiUrl}/comment/voteNo/${id}`, payload, {
      withCredentials: true,
    });
  }
}
