import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryService } from './history.service';
import { MaterialModule } from './material.module';
import { PlayingHistoryComponent } from './playing-history/playing-history.component';
import { ResultHistoryComponent } from './result-history/result-history.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayingHistoryComponent,
    ResultHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [HistoryService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
