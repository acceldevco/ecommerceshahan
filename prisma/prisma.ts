import { PrismaClient } from '@prisma/client'//'../generated/prisma'//'@/generated/prisma'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}




var prisma =globalForPrisma.prisma || new PrismaClient();


export default prisma

