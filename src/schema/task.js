import mongoose from 'mongoose';
const {
  Schema
} = mongoose;

export const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    required: true,
  }
});
