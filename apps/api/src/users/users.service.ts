import { Injectable, NotFoundException } from '@nestjs/common';
import { UserTier } from '@sec-ops/shared';

export interface User {
  id: string;
  phone: string;
  password: string;
  role: UserTier;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  // In-memory store — replaced with Prisma/DB in next phase
  private users: User[] = [];

  async create(dto: { phone: string; password: string; role?: number }): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      phone: dto.phone,
      password: dto.password,
      role: (dto.role ?? UserTier.PUBLIC) as UserTier,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.users.find((u) => u.phone === phone);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
