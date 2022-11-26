import { AppError } from '@errors';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function ensureUserAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Token is missing', 401);

  const token = authorization.split(' ')[1];

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;
    const { id } = jwt.verify(token, secret) as TokenPayload;
    request.user = { id };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}