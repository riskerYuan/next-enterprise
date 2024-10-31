import { prisma } from '@/lib/prisma';
import type { CreateUserInput, User } from '@/types/user';

export class UserModel {
  static async create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data });
  }

  static async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }
} 