import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users/createUser.dto';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  const service: Partial<UsersService> = {
    findUsers: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    const user = {
      name: 'user',
    } as any;

    let findUsersSpy: jest.SpyInstance;

    beforeEach(() => {
      findUsersSpy = jest
        .spyOn(service, 'findUsers')
        .mockResolvedValueOnce([user]);
    });

    it('calls the service', async () => {
      expect(await controller.getUsers()).toEqual([user]);

      expect(findUsersSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    const createUserDto = {
      name: 'user',
      password: 'pass',
    } as CreateUserDto;

    let createUserSpy: jest.SpyInstance;

    beforeEach(() => {
      createUserSpy = jest
        .spyOn(service, 'createUser')
        .mockResolvedValueOnce(undefined);
    });

    it('calls the service', async () => {
      expect(await controller.createUser(createUserDto)).toEqual(undefined);

      expect(createUserSpy).toHaveBeenCalledWith(createUserDto);
    });
  });
});
