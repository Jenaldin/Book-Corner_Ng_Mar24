import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private apiError$$ = new BehaviorSubject<string | null>(null)
  public apiError$ = this.apiError$$.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: any, baseMessage: string): void {
    let errorMessage = baseMessage;

    if (error.status === 400) {
      errorMessage += ' There was a problem with the data you entered.';
    } else if (error.status === 500) {
      errorMessage += ' There was a problem with the server.';
    } else if (JSON.stringify(error.error.message) === undefined){
      errorMessage += ' Seems there is no such item! Please contact the Admin.'
    }

    errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

    this.apiError$$.next(errorMessage);
    this.snackBar.open(errorMessage, 'Close', {
      duration: 10000,
    });
  }
}