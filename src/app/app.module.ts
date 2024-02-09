import { NgModule , ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';
import { WordCounterComponent } from './components/word-counter/word-counter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggingInterceptor } from './services/logging-interceptor/logging-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FileLoaderComponent,
    WordCounterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,   
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: LoggingInterceptor },
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
