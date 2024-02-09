import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WordCounterComponent } from './word-counter.component';

describe('WordCounterComponent', () => {
  let component: WordCounterComponent;
  let fixture: ComponentFixture<WordCounterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WordCounterComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCounterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should display file content with line breaks', () => {
    const fileContent = 'dina\n sherif sherif sherif sherif\n selena';
    component.fileContent = fileContent;
    fixture.detectChanges();
    const cardTextElement: HTMLElement = fixture.nativeElement.querySelector('.words-card-text');
    expect(cardTextElement.textContent).toContain(fileContent);
  });
  
  it('should display repeated words data', () => {
    const wordsData: { [key: string]: number } = { 'dina': 1,  'selena': 1 ,'sherif': 4};
    component.wordsData = wordsData;
    fixture.detectChanges();
    const listItems: HTMLLIElement[] = fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(listItems.length).toEqual(Object.keys(wordsData).length);
    Object.keys(wordsData).forEach((word, index) => {
      expect(listItems[index].textContent?.trim()).toContain(`${word}: ${wordsData[word]}`);
    });
  });
  
  it('should not display repeated words data if there are no repeated words', () => {
    const wordsData: { [key: string]: number } = {};
    component.wordsData = wordsData;
    fixture.detectChanges();
    const listItems: HTMLLIElement[] = fixture.nativeElement.querySelectorAll('.list-group-item');
    expect(listItems.length).toEqual(0);
  });
  
  
});
