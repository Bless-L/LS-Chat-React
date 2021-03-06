import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  creatTime: {type: Date, default: Date.now},
  name: String,
  info: String,
  Msgs: [{type: Schema.Types.ObjectId, ref: 'Msg'}],
  maxPeople: Number
});

export default mongoose.model('Group', GroupSchema);