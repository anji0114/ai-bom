import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(): User {
    return {
      id: 1,
      name: 'Alice',
      isActive: true,
    };
  }
}
