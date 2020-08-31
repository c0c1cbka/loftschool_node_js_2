module.exports = {
  getLogin(req, res) {
    res.render('login');
  },
  auth(req,res){
    console.log(req.body);
    //res.render('login');
  }
};