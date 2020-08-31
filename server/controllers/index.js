const formidable = require('formidable');

module.exports = {
  getIndex(req,res){
    res.render('index');
  },
  postForm(req,res,next){
    let form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields)=>{
      if(err){
        return next(err);
      }
      console.log(fields);
      if(!fields.name || !fields.email || !fields.message){
        res.redirect('?msg=форма не заполнена полностью');     
      }
      console.log(`${fields.name} || ${fields.email} || ${fields.messange}`);
      res.redirect('?msg=Форма успешно загруженна');         
    });
  }
};