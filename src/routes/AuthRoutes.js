const { signUp, signIn } = require('../controllers/AuthControllers');

const router = require('express').Router();

router.post('/', (request, response) => {
  response.status(200).json({ message: 'OK' });
});
router.post('/signUp', signUp);
router.post('/signIn', signIn);

module.exports = router;
