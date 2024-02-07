import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileContent: string = "File content should be here";

  handleFileContent(content: string): void {
    this.fileContent = content;
  }
}
