import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  bio: string;

  @Column()
  profileImageUrl: string;

  @Column('simple-array')
  interests: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
