const router = require('express').Router();
const {Post, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try{
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);

  }catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try{
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if(!postData){
      res.status(404).json({message: "Entered post ID not found."});

      return;
    }

    res.status(200).json(postData);

  }catch(err){
    res.status(500).json(err);
  }
});

router.get('/comments/:id', async (req, res) => {
  try{
    const commentData = await Comment.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['name']
      }]
    });

    const comments = commentData.get({plain: true});

    res.render('comment', {
      ...comments,
      logged_in: req.session.logged_in
    });

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;