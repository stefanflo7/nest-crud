import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Observation } from '../observations/observation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Observation, (observation) => observation.user)
  observations: Observation[];

  @Column({
    nullable: false,
  })
  hashedPassword: string;
}
