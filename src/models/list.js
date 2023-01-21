import mongoose from 'mongoose';
import { listSchema } from '../schema/list.js';

export const List = mongoose.model('List', listSchema);
