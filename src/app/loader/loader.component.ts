import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}
  loader: any = false;
  ngOnInit() {
    this.loader = this.loaderService.loaderState;
    this.loader = false;
  }
}
