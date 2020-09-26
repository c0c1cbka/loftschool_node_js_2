const db = require('../models');
const helper = require('./helper');

module.exports = {
  getIndex(req, res) {
    res.render('index', {
      skills: db.get('skills').value(),
      products: db.get('products').value(),
      msgemail: req.flash('email')[0]
    });
  },

  async postForm(req, res, next) {
    try{
      var fields = await helper.getFormFields(req);
    }catch(err){
      console.error(err);
      req.flash('email', 'Ошибка обратитесь к администратору');
      return res.redirect('/admin/#status_skill');
    }

    if (!fields.name || !fields.email || !fields.message) {
      req.flash('email', 'Форма не заполнена полностью');
      res.redirect('/#status');
      return;
    }

    let tmpArr = db.get('messenges').value();
    tmpArr.push(fields);
    db.get('messenges', tmpArr).write();

    req.flash('email', 'Форма успешно загруженна');
    res.redirect('/#status');
  }
};