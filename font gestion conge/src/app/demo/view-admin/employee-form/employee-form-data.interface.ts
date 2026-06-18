// employee-form-data.interface.ts
export interface EmployeeFormData {
    id?: number; 
    nom?: string; // Nom de l'employé (optionnel)
    prenom?: string; // Prénom de l'employé (optionnel)
    email?: string; // Email de l'employé (optionnel)
    date_naissance?: string; // Date de naissance de l'employé (optionnel)
    genre?: string; // Genre de l'employé (optionnel)
    date_embauche?: string; // Date d'embauche de l'employé (optionnel)
    jobFunction?: JobFunction; // Poste de l'employé (optionnel)
    departement?: Department; // Département de l'employé (optionnel)
  }

  export interface Department {
    id: number;
    nom_departement: string;
  }

  export interface JobFunction{
    id: number;
    name: string;
    department?: {
      id: number;
      name: string;
    };
  }