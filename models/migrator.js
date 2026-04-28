import { resolve } from "node:path";
import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";

const migrationDefaultOptions = {
  dir: resolve("infra", "migrations"),
  migrationsTable: "pqmigrations",
  direction: "up",
  log: () => {},
  dryRun: true,
};

async function listPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const pendingMigrations = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...migrationDefaultOptions,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPendingMigrations,
  runPendingMigrations,
};

export default migrator;
