const formidable = require('formidable');
const path = require('path');
const db = require('../models');
const fs = require('fs');

const upload = path.join(process.cwd(), '/public/assets/img/products/');

module.exports = {
  isAdmin(req,res,next){
    if(req.session.isAdmin){
      return next();
    }
    res.redirect('/login');
  },

  getAdmin(req, res) {
    res.render('admin');
  },

  postUpload(req, res, next) {
    let form = new formidable.IncomingForm();

    form.uploadDir = upload;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return next(err);
      }

      if (files.photo.name === '' || files.photo.size === 0) {
        fs.unlinkSync(files.photo.path);
        res.redirect('/admin?msg=картинка не загруженна');
        return;
      }
      if (fields.name === '' || fields.price === '') {
        fs.unlinkSync(files.photo.path);
        res.redirect('/admin?msg=форма не заполнена полностью');
        return;
      }

      let fileName = path.join(upload, files.photo.name);

      fs.rename(files.photo.path, fileName, (err) => {
        if (err) {
          fs.unlinkSync(files.photo.path);
          res.redirect('/admin?msg=файл загружен с ошибкой');
          return;
        }
        let fileArrPath = path.join('/assets/img/products/', files.photo.name);

        let tmpArr = db.get('products').value();
        tmpArr.push({
          "src": fileArrPath,
          "name": fields.name,
          "price": Number(fields.price)
        });
        db.get('products',tmpArr).write();

        res.redirect('/admin?msg=Форма успешно загруженна');
      });

    });
  },

  postSkills(req, res, next) {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields) => {
      if (err) {
        return next(err);
      }
      if (!fields.age || !fields.concerts || !fields.cities || !fields.years) {
        res.redirect('/admin?msg=форма не заполнена полностью');
      }

      db.set('skills[0].number', Number(fields.age)).write();
      db.set('skills[1].number', Number(fields.concerts)).write();
      db.set('skills[2].number', Number(fields.cities)).write();
      db.set('skills[3].number', Number(fields.years)).write();

      res.redirect('/admin?msg=Форма успешно загруженна');
    });
  }
};