

import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export enum JobStatus {
    PENDING = "pending",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed"
}

@Entity()
export class Job{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    title : string

    @Column()
    type : string

    @Column({
    type : 'varchar',
    default : JobStatus.PENDING
    })
    status : JobStatus

    @CreateDateColumn()
    createdAt : Date
}
