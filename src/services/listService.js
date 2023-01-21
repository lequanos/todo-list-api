import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { List } from '../models/list.js';

export default {
  async getByUser(user) {
    if (!user) throw new UnauthorizedError()

    return await List.findByUser(user);
  }
}