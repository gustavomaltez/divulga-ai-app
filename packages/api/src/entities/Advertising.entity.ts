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
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.ads, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Rate, (rate) => rate.advertising, { onDelete: 'CASCADE' })
  rate: Rate[];
}
