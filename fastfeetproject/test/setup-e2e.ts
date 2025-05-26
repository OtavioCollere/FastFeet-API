import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import 'dotenv/config'

import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient({})



function generateUniqueDatabaseURL(schemaId : string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId);

  return url.toString()
}

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(randomUUID())  

  process.env.DATABASE_URL = databaseURL;

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  console.log('depois');
})
