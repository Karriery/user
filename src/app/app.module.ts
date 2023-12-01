import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { BookcallComponent } from './bookcall/bookcall.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    HomeComponent,
    BookcallComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
