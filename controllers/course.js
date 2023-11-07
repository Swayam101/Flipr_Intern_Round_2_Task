const Enrollment=require('../models/Enrollment')
const { default: mongoose } = require("mongoose")

exports.getCourseByStudent=async(req,res,next)=>{
  const {studentId}=req.params
  const course=await Enrollment.aggregate([
    {
      $match: { student: new mongoose.Types.ObjectId(studentId) }
    },
    {
      $lookup: {
        from: 'courses', // Name of the Course collection
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourses'
      }
    }
  ])
  res.json(course)
}

