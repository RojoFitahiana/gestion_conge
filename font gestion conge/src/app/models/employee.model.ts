// src/app/models/employee.model.ts
export interface Employee {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    date_naissance: string;
    genre: string;
    date_embauche: string;
    
    departement: {
      id: number;
      nom_departement: string;
      responsable_id: number;
    };
    jobFunction: {
      id :string;
      name :string;
    };
   
  }