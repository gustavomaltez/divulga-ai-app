import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rate } from './Rate.entity';
import { User } from './User.entity';

@Entity()
export class Advertising {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;

  @OneToMany(() => Rate, (rate) => rate.advertising)
  rate: Rate[];
}
