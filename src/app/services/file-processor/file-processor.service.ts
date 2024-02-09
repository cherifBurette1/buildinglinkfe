import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SweetAlertService } from '../sweet-alert/sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileProcessorService {
  constructor(private sweetAlertService: SweetAlertService) {}

  readFileContent(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        observer.next(content);
        observer.complete();
      };
      reader.onerror = (error) => {
        var errMessage: string = "error reading file";
        observer.error(error);
        console.error(errMessage, error);
        this.sweetAlertService.showToast(errMessage, 'error');
      };
      reader.readAsText(file);
    });
  }

  countWords(content: string): { [key: string]: number } {
    console.log(content);
    
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const wordsData: { [key: string]: number } = {};
    words.forEach(word => {
      word = word.toLowerCase();
      wordsData[word] = (wordsData[word] || 0) + 1;
    });
    return wordsData;
  }
}
