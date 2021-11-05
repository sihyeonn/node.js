const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Type:ObjectId } = Schema;
const commentSchema = new Schema({
  writer: { type: ObjectId, required: true, ref: 'User' },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Comment', commentSchema);
