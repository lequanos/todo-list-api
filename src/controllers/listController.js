import listService from '../services/listService.js';

export default {
  async getByUser(req, res) {
    const user = req.headers['x-user'];
    const result = await listService.getByUser(user);
    res.json(result);
  },
  async createList(req, res) {
    const { body } = req;
    const user = req.headers['x-user'];
    const result = await listService.createList(body, user);
    res.status(201).json(result);
  },
  async updateList(req, res) {
    const { body } = req;
    const user = req.headers['x-user'];
    const result = await listService.updateList(body, user);
    res.json(result);
  },
  async deleteList(req, res) {
    const { id } = req.params;
    const user = req.headers['x-user'];
    await listService.deleteList(id, user);
    res.status(204).json();
  },
  async addTask(req, res) {
    const { body } = req;
    const user = req.headers['x-user'];
    const result = await listService.addTask(body, user);
    res.json(result);
  },
};
