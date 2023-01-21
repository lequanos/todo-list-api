import { List } from '../models/list.js';

export default {
  async getByUser(user) {
    return await List.findByUser(user);
  },
  async createList(payload) {
    const list = new List(payload);
    list.save();
    return list;
  },
}