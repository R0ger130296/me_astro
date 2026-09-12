import { Pool } from 'pg';

export async function migrate(pool: Pool) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(731829)');
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (version integer PRIMARY KEY)`);
    const existing = await client.query('SELECT version FROM schema_migrations WHERE version = 1');
    if (!existing.rowCount) {
      await client.query(`CREATE TABLE projects (
        id uuid PRIMARY KEY,
        slug varchar(100) UNIQUE NOT NULL,
        content jsonb NOT NULL,
        published boolean NOT NULL DEFAULT false,
        version integer NOT NULL DEFAULT 1,
        updated_at timestamptz NOT NULL DEFAULT now()
      )`);
      await client.query('INSERT INTO schema_migrations(version) VALUES (1)');
    }
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
}

if (require.main === module) {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  migrate(pool).then(() => console.log('Migrations complete')).catch((error) => {
    console.error(error); process.exitCode = 1;
  }).finally(() => pool.end());
}
