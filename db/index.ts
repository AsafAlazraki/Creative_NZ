import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'node:path';
import * as schema from './schema';

const DB_PATH = path.join(process.cwd(), 'db', 'kavaworks.db');

declare global {
  // eslint-disable-next-line no-var
  var __kavaworksDb: ReturnType<typeof drizzle<typeof schema>> | undefined;
  // eslint-disable-next-line no-var
  var __kavaworksSqlite: Database.Database | undefined;
}

function create() {
  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  return { sqlite, db: drizzle(sqlite, { schema }) };
}

const { sqlite, db } =
  globalThis.__kavaworksDb && globalThis.__kavaworksSqlite
    ? { sqlite: globalThis.__kavaworksSqlite, db: globalThis.__kavaworksDb }
    : create();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__kavaworksDb = db;
  globalThis.__kavaworksSqlite = sqlite;
}

export { db, sqlite };
export * from './schema';
