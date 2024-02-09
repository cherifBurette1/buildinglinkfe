import { Component } from '@angular/core';
import { FileProcessorService } from './services/file-processor/file-processor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileContent: string = "File content should be here";
  wordsData: { [key: string]: number } = {};
  constructor(private fileProcessorService: FileProcessorService) {}


  handleFileContent(content: string): void {
    this.fileContent = content;
    this.wordsData = this.fileProcessorService.countWords(this.fileContent);
  }
}
