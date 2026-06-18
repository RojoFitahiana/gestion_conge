export interface Employee {
    id: number;
    nom: string;
    prenom: string;
  }
  
  export interface LeaveType {
    id: number;
    name: string;
  }
  
  export interface LeaveRequest {
    id: number;
    employe: Employee;
    date_debut: string;
    date_fin: string;
    typeConge: LeaveType;
    statut: string;
  }
  