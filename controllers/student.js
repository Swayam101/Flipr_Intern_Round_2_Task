const { default: mongoose } = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");

exports.getStudentsByCourse = async (req, res, next) => {
  const {courseId}=req.params
  const students=await Enrollment.aggregate([
    {
      $match: { course: new mongoose.Types.ObjectId(courseId) }
    },
    {
      $lookup: {
        from: 'students', // Name of the Student collection
        localField: 'student',
        foreignField: '_id',
        as: 'enrolledStudents'
      }
    },
    {
      $unwind: '$enrolledStudents'
    },
    {
      $project: {
        _id: '$enrolledStudents._id',
        name: '$enrolledStudents.name',
        age: '$enrolledStudents.age',
        email: '$enrolledStudents.email'
      }
    }
  ])
  
  res.json(students);
};

exports.getEnrollmentHistory = async (req, res, next) => {
  const result = await Student.aggregate([
    {
      $lookup: {
        from: 'enrollments', // Name of the Enrollment collection
        localField: '_id',
        foreignField: 'student',
        as: 'enrollmentHistory'
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        age: 1,
        email: 1,
        enrollmentHistory: {
          $map: {
            input: '$enrollmentHistory',
            as: 'enrollment',
            in: {
              courseId: '$$enrollment.course',
              enrollmentDate: '$$enrollment.enrollmentDate',
              grade: '$$enrollment.grade'
            }
          }
        }
      }
    }
  ])
  res.json(result);
};
