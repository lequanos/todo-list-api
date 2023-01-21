import mongoose from 'mongoose';

export default async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`${process.env.ME_CONFIG_MONGODB_URL}${process.env.MONGO_INITDB_DATABASE}?authSource=admin`);
  } catch (error) {
    console.log(error)
  }
};
