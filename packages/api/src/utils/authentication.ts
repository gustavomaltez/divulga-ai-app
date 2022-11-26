
import { User } from '@entities';
import jwt from 'jsonwebtoken';

/**
 * Generates a string access token associated to the provided user.
 * 
 * @param user The user data to generate the token for
 * @returns A string token associated to the provided user
 */
export function generateUserAccessToken(user: User): string {
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id: user.id };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME
  });
}

/**
 * Generates a string refresh token associated to the provided user.
 * 
 * @param user The user data to generate the token for
 * @returns A string token associated to the provided user
 */
export function generateUserRefreshToken(user: User): string {
  const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
  const payload = { id: user.id };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME
  });
}

/**
 * Helper function to generate both access and refresh tokens.
 * 
 * @param user The user data to generate the tokens for
 * @returns An object containing both the access and refresh tokens
 */
export function generateUserTokens(user: User): {
  accessToken: string,
  refreshToken: string;
} {
  return {
    accessToken: generateUserAccessToken(user),
    refreshToken: generateUserRefreshToken(user)
  };
}