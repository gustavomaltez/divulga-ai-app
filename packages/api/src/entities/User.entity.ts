import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Advertising } from './Advertising.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 80, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  whatsapp: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => Advertising, (advertising) => advertising.user)
  ads: Advertising[];
}
