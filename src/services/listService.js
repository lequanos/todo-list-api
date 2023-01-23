import schedule from 'node-schedule';

import { List } from '../models/list.js';
import { Task } from '../models/task.js';
import mailService from './mailService.js';
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

    this.scheduleAlert(payload.endDate, list._id, taskToAdd._id, user);
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
      this.scheduleAlert(payload.endDate, list._id, task._id, user);
    }

    task.title = payload.title;
    task.endDate = payload.endDate;
    task.status = payload.status;

    list.save();

    if (list.tasks.every((task) => task.status === 'inactive')) {
      await mailService.sendCompleteEmail(user, list.title);
    }

    return list;
  },
  async deleteTask(taskId, listId, user) {
    const list = await List.findOne({
      _id: listId
    });

    if (!list) throw new NotFoundError('List not found')

    if (list.user !== user) throw new ConflictError('Task belongs to another user')

    const task = list.tasks.id(taskId);

    if (!task) throw new NotFoundError('Task not found')

    list.tasks.id(taskId).remove();
    list.save();
  },
  scheduleAlert(endDate, listId, taskId, user) {
    const date = new Date(endDate);
    schedule.scheduleJob(date, async () => {
      const list = await List.findOne({
        _id: listId
      });
      const task = list.tasks.id(taskId);

      if (task.status === 'active') {
        await this.updateTask({
          id: task._id,
          title: task.title,
          status: 'late',
          endDate: task.endDate,
          listId: list._id,
        }, user);
        await mailService.sendAlertEmail(user, task.title);
      }
    });
  },
}