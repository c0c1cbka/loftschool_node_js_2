const formidable = require('formidable');
const path = require('path');
const db = require('../models');
const fs = require('fs');
const helpers = require('./helper');

const upload = path.join(process.cwd(), '/public/assets/img/products/');

module.exports = {
  isAdmin(req, res, next) {
    if (req.session.isAdmin) {
      return next();
    }
    res.redirect('/login');
  },

  getAdmin(req, res) {
    res.render('admin', {
      msgskill: req.flash('skill')[0],
      msgfile: req.flash('file')[0]
    });
  },

  async postUpload(req, res, next) {
    let form = new formidable.IncomingForm();

    form.uploadDir = upload;
    try {
      await new Promise(function (resolve, reject) {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
            return;
          }

          if (files.photo.name === '' || files.photo.size === 0) {
            fs.unlinkSync(files.photo.path);
            reject('картинка не загруженна');
          }
          if (fields.name === '' || fields.price === '') {
            fs.unlinkSync(files.photo.path);
            reject('форма не заполнена полностью');
          }

          let fileName = path.join(upload, files.photo.name);

          try {
            fs.renameSync(files.photo.path, fileName)
          } catch (err) {
            console.error(err);
            fs.unlinkSync(files.photo.path);
            reject('файл загружен с ошибкой');
          }

          let fileArrPath = path.join('/assets/img/products/', files.photo.name);

          let tmpArr = db.get('products').value();
          tmpArr.push({
            "src": fileArrPath,
            "name": fields.name,
            "price": Number(fields.price)
          });
          db.get('products', tmpArr).write();

          resolve();
        });
      });
    } catch (err) {
      req.flash('file',err);
      return res.redirect('/admin/#status_file');
    }
    req.flash('file','Форма успешно загруженна');
    res.redirect('/admin/#status_file');


    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     return next(err);
    //   }

    //   if (files.photo.name === '' || files.photo.size === 0) {
    //     fs.unlinkSync(files.photo.path);
    //     req.flash('file','картинка не загруженна');
    //     return res.redirect('/admin/#status_file');
    //   }
    //   if (fields.name === '' || fields.price === '') {
    //     fs.unlinkSync(files.photo.path);
    //     req.flash('file','форма не заполнена полностью');
    //     return res.redirect('/admin/#status_file');
    //   }

    //   let fileName = path.join(upload, files.photo.name);

    //   fs.rename(files.photo.path, fileName, (err) => {
    //     if (err) {
    //       fs.unlinkSync(files.photo.path);
    //       req.flash('file','файл загружен с ошибкой');
    //       return res.redirect('/admin/#status_file');
    //     }
    //     let fileArrPath = path.join('/assets/img/products/', files.photo.name);

    //     let tmpArr = db.get('products').value();
    //     tmpArr.push({
    //       "src": fileArrPath,
    //       "name": fields.name,
    //       "price": Number(fields.price)
    //     });
    //     db.get('products',tmpArr).write();

    //     req.flash('file','Форма успешно загруженна');
    //     res.redirect('/admin/#status_file');
    //   });

    // });
  },

  async postSkills(req, res, next) {
    
    try{
      var fields = await helpers.getFormFields(req);
    }catch(err){
      console.error(err);
      req.flash('skill', 'Ошибка. обратитесь к администратору');
      return res.redirect('/admin/#status_skill');
    }

    // let form = new formidable.IncomingForm();

    // form.parse(req, (err, fields) => {
    //   if (err) {
    //     return next(err);
    //   }
      if (!fields.age || !fields.concerts || !fields.cities || !fields.years) {
        req.flash('skill', 'форма не заполнена полностью');
        return res.redirect('/admin/#status_skill');
      }

      db.set('skills[0].number', Number(fields.age)).write();
      db.set('skills[1].number', Number(fields.concerts)).write();
      db.set('skills[2].number', Number(fields.cities)).write();
      db.set('skills[3].number', Number(fields.years)).write();

      req.flash('skill', 'Форма успешно загруженна');
      res.redirect('/admin/#status_skill');
    // });
  }
};