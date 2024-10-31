import { prisma } from "@/lib/prisma"
import type { CreateUserInput, User } from "@/types/user"

export class UserService {
  static async createUser(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data })
  }

  static async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany()
  }
}
