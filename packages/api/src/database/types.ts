import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';

/**
 * Represents a database instance. 
 */
export interface Database {
  /**
   * Returns a repository instance for the given entity.
   * 
   * @param entity The entity associated to the repository to be retrieved.
   * @returns The repository instance.
   */
  getRepository<EntityType extends ObjectLiteral>(entity: EntityTarget<EntityType>): Promise<Repository<EntityType>>;
}