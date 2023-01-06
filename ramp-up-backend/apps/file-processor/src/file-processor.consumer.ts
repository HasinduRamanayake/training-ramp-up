import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'apps/student-records/src/Student/entities/student.entity';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { StudentData } from './CSVData/StudentData';

@Processor('file-queue')
export class uploadProcessor {
  constructor(
    @InjectRepository(Student) private studentDataRepo: Repository<StudentData>,
  ) {}

  @Process('csv')
  async handleCsvFiles(job: Job) {
    //convertion to json file
    const csv = require('csvtojson');
    const csvFilePath = process.cwd() + '/' + job.data.file.path;
    const studentDataList = await csv().fromFile(csvFilePath);
    this.studentDataRepo.save(studentDataList);    
    
   
  }
  
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
