import { PrismaClient } from "@prisma/client"

// prisma 全局变量 在项目中就使用这个prisma的配置读取和写入数据
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
