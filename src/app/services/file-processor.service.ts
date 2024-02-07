import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileProcessorService {
  constructor() {}

  readFileContent(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        observer.next(content);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsText(file);
    });
  }

  countWords(content: string): { [key: string]: number } {
    const words = content.split(/\s+/);
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      word = word.toLowerCase();
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    return wordCounts;
  }
}
