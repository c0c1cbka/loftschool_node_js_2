const formidable = require('formidable');
const db = require('../models');

let form = new formidable.IncomingForm();

module.exports = {
  getLogin(req, res) {
    if(req.session.isAdmin){
      res.redirect('/admin');
    }else{
      res.render('login',{
        msglogin: req.flash('login')[0]
      });
    }    
  },

  auth(req,res,next){    
    form.parse(req, (err, fields)=>{
      if(err){
        return next(err);
      }
      let tmp = 0;
      let users = db.get('users').value();
      
      users.forEach(el => {
        if(fields.email === el.mail && fields.password === el.password){
          req.session.isAdmin = true;
          res.redirect('/admin');
          tmp = 1;
        }  
      });

      if(tmp === 0){
        req.flash('login','не верный логин или пароль');
        res.redirect('/login/#status');             
      }
    });
  }
};