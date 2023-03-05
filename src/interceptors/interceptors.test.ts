import { RequestPlus } from '../interfaces/interfaces.js';
import { Interceptors } from './interceptors.js';
import { Response } from 'express';

jest.mock('../services/auth');
jest.mock('../config.js', () => ({
  _dirname: 'test',
  config: {
    secret: 'test',
  },
}));

const req = {
  get: jest.fn(),
} as unknown as RequestPlus;

const resp = {} as unknown as Response;
const next = jest.fn();

describe('Given a interceptor class', () => {
  const interceptor = new Interceptors();
  describe('When logged is called ', () => {
    test('Then it should do next', () => {
      (req.get as jest.Mock).mockReturnValue('Bearer test');

      interceptor.logged(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if the token is invalid show catch error and throw next', () => {
      (req.get as jest.Mock).mockReturnValue('ciao');

      interceptor.logged(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if req.get return undefined, it should be catch and call next function', () => {
      (req.get as jest.Mock).mockReturnValue('');

      interceptor.logged(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
