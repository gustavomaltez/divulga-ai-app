import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'timestamp with time zone', nullable: false })
  date: Date;

  @ManyToOne(() => User, (user) => user.ads)
  user: User;

  @OneToMany(() => Rate, (rate) => rate.advertising)
  rate: Rate[];
}
