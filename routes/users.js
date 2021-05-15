const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users.js');
const { validateGetCurrentUser, validateUpdateProfile } = require('../middlewares/validations.js');

router.get('/me', validateGetCurrentUser, getCurrentUser);
router.patch('/me', validateUpdateProfile, updateProfile);
module.exports = router;
