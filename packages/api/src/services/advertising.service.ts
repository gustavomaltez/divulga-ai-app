import { Database } from '@database';
import { Advertising, Rate, User } from '@entities';
import { AppError } from '@errors';

// DTO's -----------------------------------------------------------------------

type AdvertisingDTO = {
  price: number;
  description: string;
  imageUrl: string;
};

// Abstraction -----------------------------------------------------------------

/**
 * @abstract Abstract implementation of the advertising service.
 * All advertising services *MUST* extend this class.
 */
export abstract class AdvertisingService {

  /**
   * @param database An database instance.
   */
  constructor(protected readonly database: Database) { }

  /**
   * Creates a new advertising entry into database.
   * 
   * @param userId The id of the user that owns the advertising.
   * @param advertising The advertising related data to be created into the database.
   * @returns The created advertising.
   */
  abstract create(userId: string, advertising: AdvertisingDTO): Promise<AdvertisingDTO>;

  /**
   * Retrieves all advertising from database.
   * 
   * @param userId The id of the user that owns the advertising.
   * @returns The list of advertising.
   */
  abstract get(userId?: string): Promise<AdvertisingDTO[]>;

  /**
   * Updates a advertising entry into database.
   * 
   * @param userId The id of the user that owns the advertising.
   * @param advertisingId The id of the advertising to be updated.
   * @param advertising The advertising related data to be updated into the database.
   * @returns The updated advertising.
   */
  abstract update(userId: string, advertisingId: string, advertising: Partial<AdvertisingDTO>): Promise<AdvertisingDTO>;

  /**
   * Deletes a advertising entry from database.
   * 
   * @param advertisingId The id of the advertising to be deleted.
   */
  abstract delete(userId: string, advertisingId: string): Promise<void>;

  /**
   * Rates a advertising entry into database.
   * 
   * @param userId The id of the user that owns the advertising.
   * @param advertisingId The id of the advertising to be rated.
   * @param rating The rate of that ad.
  */
  abstract rate(advertisingId: string, rating: number): Promise<void>;
}

// Implementations -------------------------------------------------------------

export class DefaultAdvertisingService extends AdvertisingService {

  constructor(protected readonly database: Database) {
    super(database);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(userId: string, advertising: AdvertisingDTO): Promise<Advertising> {
    const user = await this.database.getRepository(User);
    const userEntity = await user.findOne({ where: { id: userId } });
    if (!userEntity) throw new AppError('User not found');
    const advertisingRepository = await this.database.getRepository(Advertising);
    const advertisingEntity = advertisingRepository.create(advertising);
    advertisingEntity.user = userEntity;
    const _advertising = await advertisingRepository.save(advertisingEntity);
    delete (_advertising as any).user;
    return _advertising;
  }

  async get(userId: string): Promise<Advertising[]> {
    if (!userId) {
      const advertisingRepository = await this.database.getRepository(Advertising);
      const advertising = await advertisingRepository.find({ relations: ['user', 'rate'] });
      return advertising.map(ad => ({
        ...ad,
        user: {
          id: ad.user.id,
          email: ad.user.email,
          whatsapp: ad.user.whatsapp,
        }
      })) as Advertising[];
    }
    const user = await this.database.getRepository(User);
    const userEntity = await user.findOne({ where: { id: userId } });
    if (!userEntity) throw new AppError('User not found');
    const advertisingRepository = await this.database.getRepository(Advertising);
    const advertising = await advertisingRepository.find({ where: { user: userEntity }, relations: ['rate'] });
    return advertising;
  }

  async update(userId: string, advertisingId: string, advertising: Partial<AdvertisingDTO>): Promise<Advertising> {
    const advertisingRepository = await this.database.getRepository(Advertising);
    const advertisingEntity = await advertisingRepository
      .findOne({ where: { id: advertisingId }, relations: { user: true } });
    if (!advertisingEntity) throw new AppError('Advertising not found');
    if (advertisingEntity.user.id !== userId) throw new AppError('User not authorized');
    const _advertising = await advertisingRepository.save({ ...advertisingEntity, ...advertising });
    delete (_advertising as any).user;
    return _advertising;
  }

  async delete(userId: string, advertisingId: string): Promise<void> {
    const advertisingRepository = await this.database.getRepository(Advertising);
    const advertisingEntity = await advertisingRepository
      .findOne({ where: { id: advertisingId }, relations: { user: true } });
    if (!advertisingEntity) throw new AppError('Advertising not found');
    if (advertisingEntity.user.id !== userId) throw new AppError('User not authorized');
    await advertisingRepository.remove(advertisingEntity);
  }

  async rate(advertisingId: string, rating: number): Promise<void> {
    if (rating < 0 || rating > 5) throw new AppError('Invalid rating');
    const advertisingRepository = await this.database.getRepository(Advertising);
    const advertisingEntity = await advertisingRepository.findOne({ where: { id: advertisingId } });
    if (!advertisingEntity) throw new AppError('Advertising not found');
    const ratingRepository = await this.database.getRepository(Rate);
    const ratingEntity = ratingRepository.create({ value: rating });
    ratingEntity.advertising = advertisingEntity;
    await ratingRepository.save(ratingEntity);
  }
}