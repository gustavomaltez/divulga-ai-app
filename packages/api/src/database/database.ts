import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

import { postgresDataSource } from './datasources';
import { Database as IDatabase } from './types';

/**
 * Default database handler.
 * 
 * - This class uses TypeORM to establish a connection with Database. 
 * - You can use different databases by changing the data source. 
 * - All databases operations MUST use instances of this class. 
 * - You can create your database instance at the end of this file, but remember 
 * to make only one exportation called `database`.
 * - This class is a singleton and must never be exported, only it's instancies.
 * 
 * Check all available data sources at:
 * @see https://typeorm.io/data-source-options
 */
class Database implements IDatabase {

  constructor(private readonly dataSource: DataSource) {
    this.dataSource.initialize();
    this.getRepository = this.getRepository.bind(this);
  }

  async getRepository<EntityType extends ObjectLiteral>(entity: EntityTarget<EntityType>) {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    return this.dataSource.getRepository<EntityType>(entity);
  }
}

// Database Creation ------------------------------------------------------------

const postgresDatabase = new Database(postgresDataSource);

// Default export --------------------------------------------------------------

export const database = postgresDatabase;