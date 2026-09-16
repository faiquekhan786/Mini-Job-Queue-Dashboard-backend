import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { promises } from 'dns';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  // FIXED: Promise<Job> (no brackets) and lowercase createJobDto
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const newJob = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(newJob);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID ${id} not found.`);
    }
  }

  async updateStatus(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const { status: newStatus } = updateJobDto;

    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found.`);
    }

    const currentStatus = job.status;

    if (currentStatus === JobStatus.COMPLETED || currentStatus === JobStatus.FAILED) {
      throw new BadRequestException('Cannot update a job that is already completed or failed.');
    }
    if (currentStatus === JobStatus.PENDING && (newStatus === JobStatus.COMPLETED || newStatus === JobStatus.FAILED)) {
      throw new BadRequestException('A pending job must be running before it can be completed or failed.');
    }
    if (currentStatus === JobStatus.RUNNING && newStatus === JobStatus.PENDING) {
      throw new BadRequestException('A running job cannot be moved back to pending.');
    }

    const result = await this.jobRepository.update(
      { id, status: currentStatus }, 
      { status: newStatus }
    );

    if (result.affected === 0) {
      throw new ConflictException('Race condition detected: Job status was updated by another request. Please refresh.');
    }

    return this.jobRepository.findOne({ where: { id } }) as Promise<Job>;
  }
}