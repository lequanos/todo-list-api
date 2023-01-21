import listService from '../services/listService.js';

export default {
  async getByUser(req, res) {
    const { user } = req.query;
    const result = await listService.getByUser(user);
    res.json(result);
  }
};
