import bcrypt from 'bcrypt';

/**
 * Generates a hash for a given string
 * 
 * @param string The string to be hashed.
 * @returns The hashed string.
 */
export function hashString(string: string): string {
  return bcrypt.hashSync(string, 10);
}

/**
 * Validates if a given string matches a given hash.
 * 
 * @param string The string to be compared.
 * @param hashedString The hashed string to be compared with.
 * @returns Whether the string is equal to the hashed string.
 */
export function hashedStringMatches(string: string, hashedString: string): boolean {
  return bcrypt.compareSync(string, hashedString);
}