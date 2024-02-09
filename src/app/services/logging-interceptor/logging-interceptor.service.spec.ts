import { TestBed } from '@angular/core/testing';
import { LoggingInterceptor } from './logging-interceptor.service';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingInterceptor]
    });
    interceptor = TestBed.inject(LoggingInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should log errors', () => {
    const consoleSpy = spyOn(console, 'error');
    const errorMessage = 'Test error message';
    interceptor.handleError(errorMessage);
    expect(consoleSpy).toHaveBeenCalledWith('An error occurred:', errorMessage);
  });
});
