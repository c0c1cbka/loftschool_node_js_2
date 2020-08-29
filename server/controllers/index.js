module.exports = {
  getIndex(req,res){
    res.render('index');
  },
  postIndex(req,res){
    console.log(req.body);
    res.render('index');
  }
};