import schedule from 'node-schedule';

import {
  List
} from '../models/list.js';
import {
  Task
} from '../models/task.js';
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
  async addTask(payload, user) {
    const list = await List.findOne({
      _id: payload.listId
    });

    if (!list) throw new NotFoundError('List not found')

    if (list.user !== user) throw new ConflictError('List belongs to another user')
    
    const taskToAdd = new Task(payload);
    taskToAdd.status = 'active';
    
    list.tasks.push(taskToAdd);
    list.save();

    const date = new Date(payload.endDate);
    schedule.scheduleJob(date, () => {
      list.status = 'late';
      list.save();
    });
    return list;
  },
  async updateTask(payload, user) {
    const list = await List.findOne({
      _id: payload.listId
    });

    if (!list) throw new NotFoundError('List not found')

    if (list.user !== user) throw new ConflictError('List belongs to another user')

    const task = list.tasks.id(payload.id);

    if (!task) throw new NotFoundError('Task not found')

    if (new Date(task.endDate).getTime() !== new Date(payload.endDate).getTime()) {
      const date = new Date(payload.endDate);
      schedule.scheduleJob(date, () => {
        console.log('EN RETARDDDDDDD');
      });
    }

    task.title = payload.title;
    task.endDate = payload.endDate;
    task.status = payload.status;

    list.save();

    return list;
  }
}