import mongoose from 'mongoose';
import {
  taskSchema
} from '../schema/task.js';

export const Task = mongoose.model('Task', taskSchema);
