import { connect } from 'mongoose';

// import mongoose, { connect } from 'mongoose';
// mongoose.set('debug', true); // <--- Enables debug logs

export default async function mongooseConnect(): Promise<void> {
  const mongoDBURI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
  await connect(mongoDBURI);
}
