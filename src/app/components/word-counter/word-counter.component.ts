import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-word-counter',
  templateUrl: './word-counter.component.html',
  styleUrls: ['./word-counter.component.css']
})
export class WordCounterComponent {
  @Input()
  fileContent!: string;
  @Input()
  wordsData: { [key: string]: number } = {};

  constructor() {}
}
