import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// reused across warm invocations of the same function instance
export const prisma = globalThis.prisma ?? new PrismaClient({ adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }) })
globalThis.prisma = prisma
