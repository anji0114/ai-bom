import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  findAll(): User[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
