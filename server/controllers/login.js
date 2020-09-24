const db = require('../models');
const helper = require('./helper');

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

async auth(req,res,next){    
    try{
      var fields = await helper.getFormFields(req);
    }catch(err){
      console.error(err);
      req.flash('login','Ошибка. обратитесь к администратору');
      res.redirect('/login/#status');
      return;   
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

  }
};