import { TestBed } from '@angular/core/testing';
import { FileProcessorService } from './file-processor.service';

describe('FileProcessorService', () => {
  let service: FileProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileProcessorService]
    });
    service = TestBed.inject(FileProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should count words correctly', () => {
    const content = 'dina sherif sherif sherif sherif selena';
    const expectedWordsData = { 'dina': 1, 'sherif': 4, 'selena': 1 };
    const wordsData = service.countWords(content);
    expect(wordsData).toEqual(expectedWordsData);
  });

  it('should handle empty content when counting words', () => {
    const content = '';
    const expectedWordsData = {};
    const wordsData = service.countWords(content);
    expect(wordsData).toEqual(expectedWordsData);
  });

  it('should handle content with single word when counting words', () => {
    const content = 'hello';
    const expectedWordsData = { 'hello': 1 };
    const wordsData = service.countWords(content);
    expect(wordsData).toEqual(expectedWordsData);
  });

  it('should handle content with multiple spaces when counting words', () => {
    const content = 'dina  sherif   selena ';
    const expectedWordsData = { 'dina': 1, 'sherif': 1, 'selena': 1 };
    const wordsData = service.countWords(content);
    expect(wordsData).toEqual(expectedWordsData);
  });
});
