const router = require('express').Router();
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

// allows reference to any post
router.get('/', async (req, res) => {
  try{
    const postData = await Post.findAll({
      attributes: req.body,
      include: [{
        model: User,
        attributes: ['name']
      }]
    });

    const posts = postData.map((post) => post.get({plain: true}));

    res.render('homepage', {
      posts
    });

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

// allows reference to specific posts by id
router.get('/posts/:id', async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['name']
      }]
    });

    const posts = postData.get({plain: true});

    res.render('post', {
      ...posts,
      logged_in: req.session.logged_in
    });

  }catch(err){
    res.status(500).json(err);
  }
});

// allows for reference to any comment
router.get('/comments', async (req, res) => {
  try{
    const commentData = await Comment.findAll({
      ...req.body
    });

    res.status(200).json(commentData);

  }catch(err){
    res.status(400).json(err);
  }
});

// allows for reference to specific comments by id
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

// allows for compliation of a user's dashboard for the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try{
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{model: Post}]
    });

    const user = userData.get({plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true
    });

  }catch(err){
    res.status(500).json(err);
  }
});

// directs logged-in user to the dashboard page
router.get('/login', (req, res) => {
  if(req.session.logged_in){
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// directs logged-in user who to dashboard page (signup click)
router.get('/signup', (req, res) => {
  if(req.session.logged_in){
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;