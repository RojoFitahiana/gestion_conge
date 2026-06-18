import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface JobFunction {
  id: number;
  name: string;
  department?: {  // Ici, department est un objet et non un ID
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class JobFunctionService {
  private apiUrl = 'http://localhost:3000/job-functions'; // Vérifie si l'URL est correcte

  constructor(private http: HttpClient) {}

  getJobFunctionsByDepartment(departmentId: number | string): Observable<JobFunction[]> {
    console.log('Requested departmentId:', departmentId); // Log du departmentId reçu
  
    return this.http.get<JobFunction[]>(this.apiUrl).pipe(
      map((jobFunctions) => {
        console.log('All Job Functions:', jobFunctions); // Vérifie les données reçues
        if (!Array.isArray(jobFunctions)) {
          console.error('jobFunctions is not an array:', jobFunctions);
          return [];
        }
        
        const depId = Number(departmentId);
        const filteredJobs = jobFunctions.filter((job) => job.department?.id === depId);
        
        console.log('Filtered Job Functions:', filteredJobs);
        return filteredJobs;
      })
    );
  }
  
}
