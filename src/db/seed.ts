import { reset, seed } from 'drizzle-seed'
import { db } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
      questions: { count: 20 },
    },
  }
})

// biome-ignore lint/suspicious/noConsole: Only used in dev
console.log('Database Seeded')
