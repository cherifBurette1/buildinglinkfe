import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FileProcessorService } from 'src/app/services/file-processor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.css']
})
export class FileLoaderComponent implements OnDestroy {
  @Output() fileLoaded: EventEmitter<string> = new EventEmitter<string>();
  private fileContentSubscription!: Subscription;

  constructor(private fileService: FileProcessorService) { }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileContentSubscription = this.fileService.readFileContent(file)
        .subscribe({
          next: (content: string) => {
            this.fileLoaded.emit(content);
          },
          error: (error: any) => {
            // Handle error
          }
        });
    }
  }


  ngOnDestroy(): void {
    if (this.fileContentSubscription) {
      this.fileContentSubscription.unsubscribe();
    }
  }
}
