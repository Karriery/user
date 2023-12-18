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
import Swal from 'sweetalert2';
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
  avC: any = false;
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
  cilib: any = false;
  marie: any = false;
  updateMaritalStatus(value: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(isChecked);
    const currentMaritalStatus = this.form.get(
      'situationFamiliale'
    ) as FormControl;
    let selectedMaritalStatus = currentMaritalStatus.value || [];

    if (isChecked) {
      if (value === 'Célibataire') {
        this.cilib = true;
      }
      if (value === 'Marié ou remarié') {
        this.marie = true;
      }
      selectedMaritalStatus.push(value);
    } else {
      if (value === 'Célibataire') {
        this.cilib = false;
      }
      if (value === 'Marié ou remarié') {
        this.marie = false;
      }
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
      if (value === 'Salarié du secteur privé') {
        this.avC = true;
      }
      selectedavezVousEte.push(value);
    } else {
      if (value === 'Salarié du secteur privé') {
        this.avC = false;
        selectedavezVousEte.splice(
          selectedavezVousEte.indexOf('Avec changement demployeur'),
          1
        );
      }

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
    const birthDate = new Date(this.form.value.anneDeNaissance);
    const birthYear = birthDate.getFullYear().toString();
    const birthMonth = birthDate.getMonth() + 1; // Months are zero-based
    var lastvalue = '';

    // Handle special case for the year 1961
    if (birthYear === '1961') {
      // Check the day to determine which key to use
      const day = birthDate.getDate();

      if (birthMonth < 8) {
        lastvalue = '1961, avant 31/08';
      } else if (birthMonth === 8 && day <= 31) {
        lastvalue = '1961, avant 31/08';
      } else {
        lastvalue = '1961, après 31/08';
      }
    } else {
      // Use the standard approach for other years
      lastvalue = birthYear;
    }

    if (parseInt(birthYear) < 1957) {
      lastvalue = 'Avant 1957';
    }

    if (parseInt(birthYear) > 1968) {
      lastvalue = '1968, et après';
    }
    this.form.value.anneDeNaissance = lastvalue;

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
      if (this.currentStep === 1) {
        return this.currentStep++;
      }
      if (this.currentStep === 2) {
        if (
          this.form.value.civilite !== null &&
          this.form.value.anneDeNaissance !== null &&
          this.form.value.situationFamiliale.length
        ) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 3) {
        if (
          this.form.value.nombreDenfants !== null &&
          this.form.value.nombreDenfantsEleves !== null &&
          this.form.value.etudeSuperieure !== null &&
          this.form.value.ageSouhaiteDeDepart !== null
        ) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 4) {
        if (
          this.form.value.ageDuDebutdactiviteProfessionnelle !== null &&
          this.form.value.avezVousEte.length
        ) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 5) {
        if (this.form.value.avezVousRencontre.length) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 6) {
        if (
          this.form.value.niveauActuel !== null &&
          this.form.value.evolution !== null
        ) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 7) {
        if (
          this.form.value.titreIndividuel !== null &&
          this.form.value.titreProfessionnelObligatoire !== null &&
          this.form.value.titreProfessionnelFacultatif !== null
        ) {
          return this.currentStep++;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Vous devez remplir toutes les entrées!',
          });
        }
      }
      if (this.currentStep === 8) {
        return this.currentStep++;
      }
      return this.currentStep;
    }
  }
}
