import listService from '../services/listService.js';

export default {
  async getByUser(req, res) {
    const { user } = req.query;
    const result = await listService.getByUser(user);
    res.json(result);
  },
  async createList(req, res) {
    const { body } = req;
    const result = await listService.createList(body);
    res.json(result);
  },
  async updateList(req, res) {
    const { body } = req;
    const result = await listService.updateList(body);
    res.json(result);
  }
};
