import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class LoggingInterceptor implements ErrorHandler {
  handleError(error: any): void {
    console.error('An error occurred:', error);
  }
}