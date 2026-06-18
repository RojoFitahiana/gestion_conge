import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('holiday_days')
export class HolidayDays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true })
  est_férié: boolean;
}
