import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: Number,
  userName: String,
  password: String,
});

export default mongoose.model('User', UserSchema);