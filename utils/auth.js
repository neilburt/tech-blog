// exported helper function that acts as authorization middleware
const withAuth = (req, res, next) => {
  if(!req.session.logged_in){
    res.redirect('./login');
    
  }else{
    next();
  }
};

module.exports = withAuth;