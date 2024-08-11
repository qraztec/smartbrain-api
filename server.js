const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '',
      database: 'smart-brain',
    },
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
//     });
//     // Load hash from your password DB. 
//     bcrypt.compare("bacon", hash, function(err, res) {
//         //res = true
//     });
//     bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
//     });

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/*
 --> res = this is working
 /signin --> POST success/fail
 /register --> POST = user
 /profile/:userId --> GET = user 
 /image --> PUT --> user
*/