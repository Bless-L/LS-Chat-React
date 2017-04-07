import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {type: String, required: true},
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
});

export default mongoose.model('User', UserSchema);