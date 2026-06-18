// src/app/services/compte-employe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model'; // Importez l'interface

@Injectable({
  providedIn: 'root',
})
export class CompteEmployeService {
  private apiUrl = 'http://localhost:3000/employees'; 

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer la liste des employés
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Employee>(url, employee);
  }

  // Méthode pour supprimer un employé
  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // URL pour supprimer un employé spécifique
    return this.http.delete<void>(url);
  }
}