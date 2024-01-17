import { DataSourceOptions, DataSource } from 'typeorm';

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, ENVIRONMENT, NODE_ENV } = process.env;

const fileExtensions = NODE_ENV === 'production' ? 'js' : 'ts';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: PGHOST ?? 'playground-postgres-database',
  port: 5432,
  username: PGUSER ?? 'postgres',
  password: PGPASSWORD ?? 'postgres',
  database: PGDATABASE ?? 'playground',
  synchronize: false,
  migrationsRun: true,
  logging: ENVIRONMENT === 'local' ?? false,
  entities: [`src/**/*entity.${fileExtensions}`],
  migrations: [`src/migrations/*.${fileExtensions}`],
};

// Create a new DataSource instance with the ormconfig.
const dataSource = new DataSource(ormconfig);

export default dataSource;
