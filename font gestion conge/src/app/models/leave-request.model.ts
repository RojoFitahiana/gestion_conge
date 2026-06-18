export interface LeaveRequest {
  id: number;
  employe_id: number;
  employe: {
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
      id: string;
      name: string;
    };
  };
  type_conge_id: number;
  type_conge: {
    id: number;
    name: string;
  };
  date_debut: string;
  date_fin: string;
  jours_pris: number;
  statut: string;
  commentaire: string;
  date_soumission: string;
}

export interface LeaveRequest2 {
  id?: number;
  date_debut: string; // Format ISO (ex: "YYYY-MM-DD")
  date_fin: string; // Format ISO
  statut?: string;
  employe_id: number; // Utilisez le format attendu par le backend
  type_conge_id: number;
  // Supprimez les relations imbriquées pour les DTOs
}