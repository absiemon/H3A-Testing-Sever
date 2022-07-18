const router = require('express').Router();
const { register, login ,getUser } = require('../controllers/usercontroller')

router.post("/register", register);
router.post("/login", login);
router.post("/getuser", getUser);

module.exports = router;


