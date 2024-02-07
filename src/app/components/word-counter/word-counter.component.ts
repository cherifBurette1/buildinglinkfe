import { Component, Input } from '@angular/core';
import { FileProcessorService } from 'src/app/services/file-processor.service';


@Component({
  selector: 'app-word-counter',
  templateUrl: './word-counter.component.html',
  styleUrls: ['./word-counter.component.css']
})
export class WordCounterComponent {
  @Input()
  fileContent!: string;

  wordCounts: { [key: string]: number } = {};

  constructor(private fileProcessorService: FileProcessorService) {}

  countWords(): void {
    this.wordCounts = this.fileProcessorService.countWords(this.fileContent);
  }
}
