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
  endDate: {
    type: Date,
    required: true,
  }
});
