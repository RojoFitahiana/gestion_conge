import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeeFormData } from './employee-form-data.interface';
//import { RouterLink } from '@angular/router';
import { DepartmentService, Department } from '../../../services/departement.service';
import { JobFunctionService, JobFunction } from '../../../services/job-function.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  departments$: Observable<Department[]>;
  jobFunctions: JobFunction[] = [];
  isDepartmentSelected = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeFormData,
    private departmentService: DepartmentService,
    private jobFunctionService: JobFunctionService
  ) {
    console.log("Données reçues :", data); // Vérifier si les données de l'employé sont bien reçues
  
    this.employeeForm = this.fb.group({
      nom: [data.nom || '', Validators.required],
      prenom: [data.prenom || '', Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]],
      date_naissance: [data.date_naissance || '', Validators.required],
      genre: [data.genre || '', Validators.required],
      date_embauche: [data.date_embauche || '', Validators.required],
      departement: [data.departement?.id || '', Validators.required],
      jobFunction: [data.jobFunction?.id || '', Validators.required],
    });
  }
  

  ngOnInit(): void {
    this.departments$ = this.departmentService.getDepartments();

    this.employeeForm.get('departement')?.valueChanges
      .pipe(
        switchMap((departmentId) => {
          console.log('Selected Department ID:', departmentId);
          this.isDepartmentSelected = !!departmentId;
          return departmentId
            ? this.jobFunctionService.getJobFunctionsByDepartment(departmentId).pipe(
                catchError((error) => {
                  console.error('Erreur lors du chargement des postes', error);
                  return of([]); // Retourne un tableau vide en cas d'erreur
                })
              )
            : of([]);
        })
      )
      .subscribe((jobFunctions) => {
        console.log('Job Functions Received:', jobFunctions);
        this.jobFunctions = jobFunctions;
      });
      console.log("Valeurs du formulaire :", this.employeeForm.value);
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log("Données soumises :", this.employeeForm.value); // Vérifier les valeurs envoyées
      this.dialogRef.close(this.employeeForm.value);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  
}
