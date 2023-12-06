import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements OnInit {
  @Input()
  currentStep!: number;

  steps = [1, 2, 3, 4, 5, 6, 7, 8];

  ngOnInit(): void {}
}
