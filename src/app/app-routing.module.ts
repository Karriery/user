import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { BookcallComponent } from './bookcall/bookcall.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form', component: FormComponent },
  { path: 'result', component: ResultComponent },
  { path: 'bookcall', component: BookcallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
