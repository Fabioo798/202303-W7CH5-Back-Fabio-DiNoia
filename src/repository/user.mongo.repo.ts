import createDebug from 'debug'
import { User } from '../entities/user';
import { HTTPError } from '../error/error';
import { UserModel } from './user.mongo.model';
import { Repo } from './user.mongo.repo.interface';

const debug = createDebug('W7CH5: repo');

export class UserRepo implements Repo<User> {
  private static instance: UserRepo;

  private constructor() {
    debug('Instantiate UserRepo');

  }

  public static getInstance(): UserRepo {
    if(!UserRepo.instance) {
      UserRepo.instance = new UserRepo()
    }

    return UserRepo.instance;
  }

  async query(): Promise<User[]> {
    debug('query');
    const data = await UserModel.find().populate('users')
    return data;
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id).populate('users');
    if(!data) throw new HTTPError(404, 'Not Found', 'queryId not possible: id not found in database');
    return data;
  }

  async search(query: { key: string; value: unknown; }): Promise<User[]> {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value});
    if (!data) throw new HTTPError(404, 'Not Found', 'search not possible: element not found in database');
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update')
    const data = await UserModel.findByIdAndUpdate(info.id, info,{
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not Found', 'update not possible: id not found in database');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy')
    const data = await UserModel.findByIdAndDelete(id)
    if (!data)
      throw new HTTPError(404, 'Not Found', 'delete not possible: id not found in database');
  }
}
