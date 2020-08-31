const formidable = require('formidable');

let form = new formidable.IncomingForm();

module.exports = {
  getLogin(req, res) {
    res.render('login');
  },

  auth(req,res){    
    form.parse(req, (err, fields)=>{
      if(err){
        return next(err);
      }

      if(fields.email === 'admin@mail.ru' && fields.password === '123'){
        /*TODO реализовать сохранение сессии через куки*/
        res.redirect('/admin');
      }else{
        res.redirect('/login?msg=не верный логин или пароль');         
      }      
    });
  }
};