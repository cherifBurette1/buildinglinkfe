import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FileProcessorService } from 'src/app/services/file-processor/file-processor.service';
import { Subscription } from 'rxjs';
import { FileValidator } from 'src/utils/file-validator';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.css']
})
export class FileLoaderComponent implements OnDestroy {
  @Output() fileLoaded: EventEmitter<string> = new EventEmitter<string>();
  private fileContentSubscription!: Subscription;
  uploadedFile!: File;

  constructor(private fileProcessorService: FileProcessorService, private sweetAlertService: SweetAlertService) { }

  handleFileInput(event: any): void {
    this.uploadedFile = event.target.files[0];
    this.readFile(this.uploadedFile);
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.uploadedFile = event.dataTransfer?.files[0] as File;
    if (this.uploadedFile instanceof File) {
      this.readFile(this.uploadedFile);
    }  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  readFile(file: File): void {
    if (file) {
      const allowedExtensions = ['txt'];
      if (!FileValidator.isValidFile(file, allowedExtensions)) {
        this.sweetAlertService.showToast('Please select a .txt file', 'error');
        return;
      }
      this.fileContentSubscription = this.fileProcessorService.readFileContent(file)
        .subscribe({
          next: (content: string) => {
            this.fileLoaded.emit(content);
          },
          error: (error: any) => {
          var errMessage: string = 'An error occurred while reading the file: ';
          this.sweetAlertService.showToast(errMessage, 'error');
          console.error(errMessage, error);
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
