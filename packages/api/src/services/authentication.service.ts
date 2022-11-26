import { Database } from '@database';
import { User } from '@entities';
import { AppError } from '@errors';
import { generateUserTokens, hashedStringMatches, hashString } from '@utils';

// DTO's -----------------------------------------------------------------------

interface RegisterUserDTO {
  whatsapp: string;
  email: string;
  password: string;
}

interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

interface RegisterUserResponse extends UserTokens {
  id: string;
}

// Abstraction -----------------------------------------------------------------

/**
 * @abstract Abstract implementation of the authentication service.
 * All authentication services *MUST* extend this class.
 */
export abstract class AuthenticationService {

  /**
   * @param database An database instance.
   */
  constructor(protected readonly database: Database) { }

  /**
   * Creates a new user entry into database.
   * 
   * @param user The user related data to be created into the database.
   */
  abstract register(user: RegisterUserDTO): Promise<RegisterUserResponse>;

  /**
   * Authenticates a user and returns the authentication token.
   * 
   * @param email The user email.
   * @param password The user password.
   */
  abstract login(email: string, password: string): Promise<RegisterUserResponse>;
}

// Implementations -------------------------------------------------------------

export class DefaultAuthenticationService extends AuthenticationService {

  constructor(protected readonly database: Database) {
    super(database);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(user: RegisterUserDTO): Promise<RegisterUserResponse> {
    if (!user.whatsapp) throw new AppError('User whatsapp is missing', 401);
    if (!user.email) throw new AppError('User email is missing', 401);
    if (!user.password) throw new AppError('User password is missing', 401);

    const { whatsapp, email, password } = user;
    const userRepository = await this.database.getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) throw new AppError('User already exists');

    const _user = userRepository.create({ whatsapp, email, password });
    _user.password = hashString(_user.password);
    const createdUser = await userRepository.save(_user);

    return {
      ...generateUserTokens(createdUser),
      id: createdUser.id,
    };
  }

  async login(email: string, password: string): Promise<RegisterUserResponse> {
    if (!email) throw new AppError('User email is missing', 401);
    if (!password) throw new AppError('User password is missing', 401);

    const userRepository = await this.database.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new AppError('Invalid credentials');

    const isPasswordCorrect = hashedStringMatches(password, user.password);

    if (!isPasswordCorrect) throw new AppError('Invalid credentials');

    return {
      ...generateUserTokens(user),
      id: user.id,
    };
  }
}