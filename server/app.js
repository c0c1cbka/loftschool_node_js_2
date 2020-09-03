const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();

const config = JSON.parse(fs.readFileSync(path.join(__dirname,'config.json'), 'utf8'));
const PORT = config.PORT;

app.set('views',path.join(__dirname,config.template_path));
app.set('view engine','pug');

app.use(express.static(path.join(__dirname,config.public_path)));

app.use(session({
  secret : 'homework',
  key: 'sessionkey',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60*1000
  },
  saveUninitialized: false,
  resave: false
}));

app.use('/',require('./routes/index'));
app.use('/login',require('./routes/login'));
app.use('/admin',require('./routes/admin'));

app.listen(PORT,()=>{
  // eslint-disable-next-line no-console
  console.log(`server started in ${PORT} port`);
});