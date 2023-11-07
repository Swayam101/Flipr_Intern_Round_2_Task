const { getCourseByStudent } = require('../controllers/course')

const router=require('express').Router()

router.get('/:studentId',getCourseByStudent)

module.exports=router