const formidable = require('formidable');
const db = require('../models');

let form = new formidable.IncomingForm();

module.exports = {
  getIndex(req,res){
    /*return */res.render('index',{
      skills: db.get('skills').value(),
      products: db.get('products').value(),
      msgemail: req.flash('email')[0]
    });
  },

  postForm(req,res,next){    
    form.parse(req, (err, fields)=>{
      if(err){
        return next(err);
      }
      if(!fields.name || !fields.email || !fields.message){
        req.flash('email','Форма не заполнена полностью');
        /*return */res.redirect('/#status');
      }
      req.flash('email','Форма успешно загруженна');
      /*return */res.redirect('/#status');      
    });
  }
};