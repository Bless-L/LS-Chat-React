import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  time: {type: Date, default: Date.now},
  speaker: {type: Schema.Types.ObjectId, ref: 'User'},
  content: Mixed,
  type: String,
  group: {type: Schema.Types.ObjectId, ref: 'Group'},
});

export default mongoose.model('Msg', MsgSchema);