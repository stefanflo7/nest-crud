import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Observation } from '../observations/observation.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  imageUrl!: string;

  @ManyToOne(() => Observation, (observation) => observation.images, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  observation!: Observation;

  @RelationId((image: Image) => image.observation)
  @Column({ nullable: false })
  observationId: string;
}
