import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ErrorState {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<ErrorState | null>(null);

  handleError(error: any): void {
    console.error('An error occurred:', error);
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      // Server or connection errors
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'You are not authorized. Please log in.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'A server error occurred. Please try again later.';
          break;
        case 0:
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }
    } else if (error instanceof Error) {
      // Client-side errors
      errorMessage = error.message;
    } else {
      // Fallback error message
      errorMessage = 'An unknown error occurred. Please try again.';
    }

    this.errorSubject.next({
      message: errorMessage,
      type: 'error',
      timestamp: new Date()
    });
  }

  getErrors(): Observable<ErrorState | null> {
    return this.errorSubject.asObservable();
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
} 