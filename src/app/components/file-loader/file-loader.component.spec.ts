import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FileLoaderComponent } from './file-loader.component';
import { FileProcessorService } from 'src/app/services/file-processor/file-processor.service';
import { of, throwError } from 'rxjs';
import { SweetAlertService } from 'src/app/services/sweet-alert/sweet-alert.service';

describe('FileLoaderComponent', () => {
  let component: FileLoaderComponent;
  let fixture: ComponentFixture<FileLoaderComponent>;
  let fileProcessorServiceSpy: jasmine.SpyObj<FileProcessorService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  beforeEach(waitForAsync(() => {
    const fileProcessorSpy = jasmine.createSpyObj('FileProcessorService', ['readFileContent']);
    const sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['showToast']);

    TestBed.configureTestingModule({
      declarations: [FileLoaderComponent],
      providers: [
        { provide: FileProcessorService, useValue: fileProcessorSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy }
      ]
    }).compileComponents();

    fileProcessorServiceSpy = TestBed.inject(FileProcessorService) as jasmine.SpyObj<FileProcessorService>;
    sweetAlertServiceSpy = TestBed.inject(SweetAlertService) as jasmine.SpyObj<SweetAlertService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file input and read file content', () => {
    const file = new File(['file content'], 'test.txt');
    const fileContent = 'file content';
    fileProcessorServiceSpy.readFileContent.and.returnValue(of(fileContent));

    component.handleFileInput({ target: { files: [file] } });

    expect(component.uploadedFile).toBe(file);
    expect(fileProcessorServiceSpy.readFileContent).toHaveBeenCalledWith(file);
    expect(sweetAlertServiceSpy.showToast).not.toHaveBeenCalled();
  });

  it('should handle invalid file extension', () => {
    const file = new File(['file content'], 'test.docx');

    component.handleFileInput({ target: { files: [file] } });

    expect(component.uploadedFile).toBe(file);
    expect(fileProcessorServiceSpy.readFileContent).not.toHaveBeenCalled();
    expect(sweetAlertServiceSpy.showToast).toHaveBeenCalledWith('Please select a .txt file', 'error');
  });

  it('should handle file reading error', () => {
    const file = new File(['file content'], 'test.txt');
    const errorMessage = 'An error occurred while reading the file: ';
    fileProcessorServiceSpy.readFileContent.and.returnValue(throwError(errorMessage));
  
    component.handleFileInput({ target: { files: [file] } });
  
    expect(component.uploadedFile).toBe(file);
    expect(fileProcessorServiceSpy.readFileContent).toHaveBeenCalledWith(file);
    expect(sweetAlertServiceSpy.showToast).toHaveBeenCalledWith(errorMessage, 'error');
  });   
});