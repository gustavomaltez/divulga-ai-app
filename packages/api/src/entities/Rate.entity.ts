import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Advertising } from './Advertising.entity';

@Entity()
export class Rate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int', nullable: false })
    value: number;

    @ManyToOne(() => Advertising, (advertising) => advertising.rate, { onDelete: 'CASCADE' })
    advertising: Advertising;
}
