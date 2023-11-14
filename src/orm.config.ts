import { TypeOrmModuleOptions } from '@nestjs/typeorm'

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: false,
    ENTITIES: [__dirname + '/domain/*{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  }
  //npm i @nestjs/typeorm typeorm mysql2
  return {
    name: 'default',
    type: 'mysql',
    database: 'classcode',
    host: 'localhost',
    port: Number(3306),
    username: 'root',
    password: '1101',
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  }
}

export { ormConfig };
