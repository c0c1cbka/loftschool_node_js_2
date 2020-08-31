const formidable = require('formidable');
const db = require('../models');

let form = new formidable.IncomingForm();

module.exports = {
    getAdmin(req,res){
        //TODO реализовать перекидывание на авторизацию если пользователь не залогинен
        res.render('admin');
      },
    
      postUpload(req,res){

      },

      postSkills(req,res){
        form.parse(req, (err, fields)=>{
          if(err){
            return next(err);
          }
          if(!fields.age || !fields.concerts || !fields.cities || !fields.years){
            res.redirect('/admin?msg=форма не заполнена полностью');  
          }

          //TODO реализвать обновление данных в lowdb

          res.redirect('/admin?msg=Форма успешно загруженна');      
        });
      }
};