import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FileProcessorService } from './services/file-processor/file-processor.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fileProcessorService: jasmine.SpyObj<FileProcessorService>;

  beforeEach(async () => {
    const fileProcessorSpy = jasmine.createSpyObj('FileProcessorService', ['countWords']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: FileProcessorService, useValue: fileProcessorSpy }]
    }).compileComponents();

    fileProcessorService = TestBed.inject(FileProcessorService) as jasmine.SpyObj<FileProcessorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update fileContent and wordsData when handleFileContent is called', () => {
    // Arrange
    const content = 'This is a test content';
    const wordsData = { test: 1, content: 1 }; // Sample wordsData
    fileProcessorService.countWords.and.returnValue(wordsData); // Stubbing countWords method

    // Act
    component.handleFileContent(content);

    // Assert
    expect(component.fileContent).toEqual(content);
    expect(component.wordsData).toEqual(wordsData);
  });

  it('should render the file loader and word counter components', () => {
    // Arrange & Act
    const compiled = fixture.nativeElement;

    // Assert
    expect(compiled.querySelector('app-file-loader')).toBeTruthy();
    expect(compiled.querySelector('app-word-counter')).toBeTruthy();
  });
});
