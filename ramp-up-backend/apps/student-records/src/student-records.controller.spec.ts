import { Test, TestingModule } from '@nestjs/testing';
import { StudentRecordsController } from './student-records.controller';
import { StudentRecordsService } from './student-records.service';



describe('StudentRecordsController', () => {
  let studentRecordsController: StudentRecordsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentRecordsController],
      providers: [StudentRecordsService],
    }).compile();

    studentRecordsController = app.get<StudentRecordsController>(StudentRecordsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(studentRecordsController.getHello()).toBe('Hello World!');
    });
  });
});
