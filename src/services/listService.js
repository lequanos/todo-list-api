import { List } from '../models/list.js';
import { NotFoundError } from '../errors/errors.js';

export default {
  async getByUser(user) {
    return await List.findByUser(user);
  },
  async createList(payload) {
    const list = new List(payload);
    list.save();
    return list;
  },
  async updateList(payload) {
    const list = await List.findOne({ _id: payload.id });

    if (!list) throw new NotFoundError('List not found')

    list.title = payload.title;
    list.tasks = payload.tasks || list.tasks;
    list.user = payload.user;

    list.save();
    return list;
  },
  async deleteList(id) {
    const list = await List.findOne({
      _id: id
    });

    if (!list) throw new NotFoundError('List not found')

    await List.deleteOne({ _id: id });
  },
}