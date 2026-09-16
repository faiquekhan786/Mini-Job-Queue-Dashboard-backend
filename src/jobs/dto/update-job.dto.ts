import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

export class UpdateJobDto{
    @IsEnum(JobStatus)
    @IsNotEmpty()
    status: JobStatus;
    
}
