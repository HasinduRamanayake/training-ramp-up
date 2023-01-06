import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request,Response } from 'express';
import { Repository } from 'typeorm';
import { AdminController } from './Admins/admin.controller';
import { Admin } from './Admins/admin.entity';
import { AdminService } from './Admins/admin.service';
import { AddAdminDTO } from './dto/AddAdminDTO';
import * as httpMocks from 'node-mocks-http';


describe('AdminsController', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  let name: string = 'Hasindu';
  let password: string = '123456';
  let refreshToken: string = 'jhslgrhgoief94753465hefoiwgofgsk';
  
  const result = {
    accessToken: 'access',
    refreshToken: 'refresh',
  };

  const admin: Admin = {
    id: 'jlnfen243',
    name: 'hasindu',
    password: '372867',
    refreshToken:
      'dsadklajlkfhkdfgsgksg74869826492eyhfslhfie78wftgo87wiegoo78evl',
  };
  const admin2: Admin = {
    id: 'jlnfen243',
    name: 'hasindu',
    password: '372867',
    refreshToken:
      'dsadklajlkfhkdfgsgksg74869826492eyhfslhfie78wftgo87wiegoo78evl',
  };


  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            register: jest.fn(() => Promise.resolve(result)),
            findOne: jest.fn(() => Promise.resolve(admin)),
            refreshTokens: jest.fn(() => Promise.resolve(result)),
            logout: jest.fn(()=> Promise.resolve(admin2))
          },
        },
      ],
    }).compile();

    adminController = moduleRef.get<AdminController>(AdminController);
    adminService = moduleRef.get<AdminService>(AdminService);
    
  });

 
  describe('register', () => {
    it('should return Tokens', async () => {
      const dto: AddAdminDTO = { name, password, refreshToken };

      expect(await adminController.register(dto)).toEqual(result);
    });
  });

  // describe('login', () => {
  //   it('should return Tokens', async () => {
  //     let refreshToken: any = 'jhslgrhgoief94753465hefoiwgofgsk';
  //     let accessToken: any = 'djskabifudslgole7698et76rehisflkjsdbf';

  //     let name: string = 'Hasindu';
  //     let password: string = '123456';

  //     adminController.login(name, password, req.res);
  //     expect(await adminController.login(name, password, responseMock)).toEqual(
  //       result,
  //     );
  //   });
  // });

  describe('findOne', () => {
    it('should return an Admin', async () => {
      const id: any = 'jlnfen243';

      expect(await adminService.findOne(id)).toBe(admin);
    });
  });

 const requestMock = {
   user: { id: 'jlnfen243' },
 } as unknown as Request;

    describe('logOut', () => {
      it('should return an Admin', async () => {
        
        // const id = 'jlnfen243';

        expect(await adminController.logOut(requestMock)).toBe(admin2);
      });
    });

    const refreshRequestMock = {
      user: { id: 'jlnfen243', refreshToken: 'refresh' },
    } as unknown as Request;

    describe('refreshTokens', () => {
      it('should return an Admin', async () => {     

        expect(await adminController.refreshTokens(refreshRequestMock)).toBe(result);
      });
    });
});
