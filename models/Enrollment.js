const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollmentDate: Date,
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
