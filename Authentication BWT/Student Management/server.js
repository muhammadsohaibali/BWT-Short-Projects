const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const checkAuth = require('./src/middleware/checkAuth')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

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
  if (isAuth) return res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'));
  res.redirect('/login');
})

app.get('/all-students', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.sendFile(path.join(__dirname, 'pages', 'all-students.html'));
  res.redirect('/login');
})

app.get('/login', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.redirect('/dashboard');
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
})

app.get('/forgot-password', (req, res) => {
  const isAuth = checkAuth(req, res)
  if (isAuth) return res.redirect('/dashboard');
  res.sendFile(path.join(__dirname, 'pages', 'forgot-password.html'));
})

// =======================================================================================

app.listen(PORT, () => {
  console.log('\n'); // FOR SPACING IN CONSOLE
  console.log(`Server running at http://localhost:${PORT}`);
});
