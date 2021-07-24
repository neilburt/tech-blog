const router = require('express').Router();
const User = require('../../models/User.js');

router.post('/', async (req, res) => {
  try{
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(err);
    });
    
  }catch(err){
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try{
    const userData = await User.findOne({where: {email: req.body.email}});

    if(!userData){
      res.status(400).json({
        message: "The email or password you entered is incorrect. Please try again."
      });
      
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if(!validPassword){
      res.status(400).json({
        message: "The email or password you entered is incorrect. Please try again."
      });

      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({user: userData, message: "Login successful."});
    });

  }catch(err){
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }else{
    res.status(404).end();
  }
});

module.exports = router;