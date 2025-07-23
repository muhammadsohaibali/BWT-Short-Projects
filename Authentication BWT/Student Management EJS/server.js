const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const checkAuth = require('./src/middleware/checkAuth')

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const { getDB } = require('./src/config/dbConfig');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// =======================================================================================

app.get('/', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.redirect('/dashboard');
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.render('dashboard', { data: { userData: req.user } });
  return res.redirect('/login');
})

app.get('/all-students', (req, res) => {
  const isAuth = checkAuth(req, res)
  const allStudents = getDB()
  if (isAuth) return res.render('all-students', { data: { userData: req.user, allStudents } });
  res.redirect('/login');
})

app.get('/profile', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.render('profile', { data: { userData: req.user } });
  res.redirect('/login');
})

app.get('/login', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.redirect('/dashboard');

  const error = req.cookies?.['error-cookie'] || null
  res.clearCookie('error-cookie')

  const username = req.cookies?.['username-cookie'] || null
  res.clearCookie('username-cookie')

  res.render('login', { data: { error, username } });
})

app.get('/forgot-password', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.redirect('/dashboard');
  res.render('forgot-password');
})

// =======================================================================================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
