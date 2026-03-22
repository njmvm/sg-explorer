import { neon } from '@neondatabase/serverless'

let _sql = null

function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

export default function sql(strings, ...values) {
  return getSql()(strings, ...values)
}
