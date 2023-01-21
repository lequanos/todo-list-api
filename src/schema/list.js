import mongoose from 'mongoose';
import {
  taskSchema
} from './task.js';

const {
  Schema
} = mongoose;

export const listSchema = new Schema({
  title: String,
  tasks: [taskSchema],
  user: {
    type: String,
    required: true,
  }
}, {
  statics: {
    findByUser(user) {
      return this.find({
        user: new RegExp(user, 'i')
      });
    }
  }
});