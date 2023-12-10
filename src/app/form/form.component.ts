import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  currentStep = 1;
  lastPage = false;
  form!: FormGroup;
  billingPeriod: 'monthly' | 'yearly' = 'monthly';
  arcadePlan = 9;
  advancedPlan = 12;
  proPlan = 15;
  onlineService = 1;
  storage = 2;
  customProfile = 2;
  total = 9;
  constructor(
    private formBuilder: FormBuilder,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nom: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      tel: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
        ),
      ]),

      civilite: new FormControl(null),
      anneDeNaissance: new FormControl(null),
      situationFamiliale: this.formBuilder.control([]),
      avezVousEte: this.formBuilder.control([]),
      avezVousRencontre: this.formBuilder.control([]),

      nombreDenfants: new FormControl(null),
      nombreDenfantsEleves: new FormControl(null),
      etudeSuperieure: new FormControl(null),
      ageSouhaiteDeDepart: new FormControl(null),
      ageDuDebutdactiviteProfessionnelle: new FormControl(null),
      niveauActuel: new FormControl(null),
      evolution: new FormControl(null),
      titreIndividuel: new FormControl(null),
      titreProfessionnelFacultatif: new FormControl(null),
      titreProfessionnelObligatoire: new FormControl(null),
    });
  }
  updateMaritalStatus(value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentMaritalStatus = this.form.get(
      'situationFamiliale'
    ) as FormControl;
    let selectedMaritalStatus = currentMaritalStatus.value || [];

    if (isChecked) {
      selectedMaritalStatus.push(value);
    } else {
      selectedMaritalStatus = selectedMaritalStatus.filter(
        (status: string) => status !== value
      );
    }

    currentMaritalStatus.setValue(selectedMaritalStatus);
  }

  updateavezVousEte(value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentavezVousEte = this.form.get('avezVousEte') as FormControl;
    let selectedavezVousEte = currentavezVousEte.value || [];

    if (isChecked) {
      selectedavezVousEte.push(value);
    } else {
      selectedavezVousEte = selectedavezVousEte.filter(
        (status: string) => status !== value
      );
    }

    currentavezVousEte.setValue(selectedavezVousEte);
  }
  updateavezVousRencontre(value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentavezVousRencontre = this.form.get(
      'avezVousRencontre'
    ) as FormControl;
    let selectedavezVousRencontre = currentavezVousRencontre.value || [];

    if (isChecked) {
      selectedavezVousRencontre.push(value);
    } else {
      selectedavezVousRencontre = selectedavezVousRencontre.filter(
        (status: string) => status !== value
      );
    }

    currentavezVousRencontre.setValue(selectedavezVousRencontre);
  }

  onSubmit() {
    this.documentService.createDocument(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/result'], {
          queryParams: { id: response._id },
        });
      },
      (error) => {
        console.error('Error creating document:', error);
      }
    );
  }

  changePage(isNextPage: boolean) {
    console.log('dqsdqsdqsd', this.form);
    if (!isNextPage) {
      return this.currentStep--;
    } else {
      if (this.currentStep === 3) {
      }
      return this.currentStep++;
    }
  }
}
