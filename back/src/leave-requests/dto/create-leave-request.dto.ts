// create-leave-request.dto.ts
export class CreateLeaveRequestDto {
  date_debut: Date;
  date_fin: Date;
  employe_id: number; // 👈 Snake_case pour correspondre à la requête
  type_conge_id: number;
  commentaire?: string;
}
