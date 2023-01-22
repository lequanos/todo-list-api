import { List } from '../models/list.js';
import { NotFoundError, ConflictError } from '../errors/errors.js';

export default {
  async getByUser(user) {
    return await List.findByUser(user);
  },
  async createList(payload, user) {
    const list = new List(payload);
    list.user = user;
    list.save();
    return list;
  },
  async updateList(payload, user) {
    const list = await List.findOne({ _id: payload.id });

    if (!list) throw new NotFoundError('List not found')

    if (list.user !== user) throw new ConflictError('List belongs to another user')

    list.title = payload.title;
    list.tasks = payload.tasks || list.tasks;

    list.save();
    return list;
  },
  async deleteList(id, user) {
    const list = await List.findOne({
      _id: id
    });

    if (!list) throw new NotFoundError('List not found')
    
    if (list.user !== user) throw new ConflictError('List belongs to another user')

    await List.deleteOne({ _id: id });
  },
}