const formidable = require('formidable');
const db = require('../models');

let form = new formidable.IncomingForm();

module.exports = {
  getIndex(req,res){
    res.render('index',{
      skills: db.get('skills').value(),
      products: db.get('products').value()
    });
  },

  postForm(req,res,next){    
    form.parse(req, (err, fields)=>{
      if(err){
        return next(err);
      }
      if(!fields.name || !fields.email || !fields.message){
        res.redirect('?msg=форма не заполнена полностью');     
      }
      res.redirect('?msg=Форма успешно загруженна');         
    });
  }
};