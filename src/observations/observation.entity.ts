import { Image } from '../images/image.entity';
import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    nullable: false,
  })
  date!: Date;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    nullable: false,
    default: '',
  })
  description!: string;

  @ManyToOne(() => User, (user) => user.observations, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user!: User;

  @RelationId((observation: Observation) => observation.user)
  @Column({ nullable: false })
  userId: string;

  @OneToMany(() => Image, (image) => image.observation, { nullable: false })
  images!: Image[];
}
