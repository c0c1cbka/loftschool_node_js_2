const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const config = JSON.parse(fs.readFileSync(path.join(__dirname,'config.json'), 'utf8'));
const PORT = config.PORT;

app.set('views',path.join(__dirname,config.template_path));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,config.public_path)));

app.use('/',require('./routes'));

app.listen(PORT,()=>{
  // eslint-disable-next-line no-console
  console.log(`server started in ${PORT} port`);
});