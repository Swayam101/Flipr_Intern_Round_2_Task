const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  credits: Number,
});

module.exports = mongoose.model('Course', courseSchema);
