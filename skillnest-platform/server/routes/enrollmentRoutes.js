const express = require('express');
const router = express.Router();
const { enrollInCourse, getUserEnrollments } = require('../controllers/enrollmentController'); // Check function names here
const { protect } = require('../middleware/authMiddleware');

router.post('/enroll', protect, enrollInCourse);
router.get('/user/enrollments', protect, getUserEnrollments);

module.exports = router;
