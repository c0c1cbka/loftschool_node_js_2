const formidable = require('formidable');
const path = require('path');
const db = require('../models');

module.exports = {
    getAdmin(req,res){
        //TODO реализовать перекидывание на авторизацию если пользователь не залогинен
        res.render('admin');
      },
    
      postUpload(req,res){
        let form = new formidable.IncomingForm();

        form.uploadDir = path.join(__dirname,'../public/assets/ing/products/');
        form.parse(req,(err, fields, files)=>{
          if(err){
            return next(err);
          }
        });
      },

      postSkills(req,res){
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields)=>{
          if(err){
            return next(err);
          }
          if(!fields.age || !fields.concerts || !fields.cities || !fields.years){
            res.redirect('/admin?msg=форма не заполнена полностью');  
          }

          db.set('skills[0].number',Number(fields.age)).write();
          db.set('skills[1].number',Number(fields.concerts)).write();
          db.set('skills[2].number',Number(fields.cities)).write();
          db.set('skills[3].number',Number(fields.years)).write();
          
          res.redirect('/admin?msg=Форма успешно загруженна');      
        });
      }
};