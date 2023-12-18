import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';
import { BookcallComponent } from './bookcall/bookcall.component';
import { StepperComponent } from './stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './Interceptors/loader.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    HomeComponent,
    BookcallComponent,
    StepperComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
