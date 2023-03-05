import { RequestPlus } from '../interfaces/interfaces.js';
import { NextFunction, Response } from 'express';
import { HTTPError } from '../error/error.js';
import { Auth } from '../services/auth.js';

export class Interceptors {
  logged(req: RequestPlus, _resp: Response, next: NextFunction) {
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader)
        throw new HTTPError(
          498,
          'Invalid header',
          'Incorrect value in Auth Header'
        );
      if (!authHeader.startsWith('Bearer'))
        throw new HTTPError(498, 'Invalid header', 'Not bearer in auth header');
      const token = authHeader.slice(7);
      const payload = Auth.verifyJWTgettingPayload(token);
      req.info = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };
      next();
    } catch (error) {
      next(error);
    }
  }
}
