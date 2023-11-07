const router=require('express').Router()

const {getStudentsByCourse,getEnrollmentHistory}=require('../controllers/student')

router.get('/',getEnrollmentHistory)

router.get('/:courseId',getStudentsByCourse)



module.exports=router