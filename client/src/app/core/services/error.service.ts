import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: any, baseMessage: string): void {
    let errorMessage = baseMessage;

    if (error.status === 400) {
      errorMessage += ' There was a problem with the data you entered.';
    } else if (error.status === 500) {
      errorMessage += ' There was a problem with the server.';
    }

    errorMessage += ` Error message from server: ${JSON.stringify(error.error.message)}`;

    this.snackBar.open(errorMessage, 'Close', {
      duration: 20000,
    });
  }
}