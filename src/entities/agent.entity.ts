import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { STATUS_COLUMN } from './shared/data';

@Entity()
export class Agent {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: "100" })
    fullName: string;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ unique: true, type: "varchar", length: "100" })
    email: string;

    @Column({ nullable: false })
    destinationGroup: string;

    @Column({ nullable: false })
    registrationDate: Date;

    @Column(STATUS_COLUMN)
    canMakeCalls: boolean;

    @Column({ nullable: false })
    photo: string;
}
