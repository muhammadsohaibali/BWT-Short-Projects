const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const appConfig = require('./src/config/appConfig');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const pageRoutes = require('./src/routes/page.routes');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use('/', pageRoutes);             
app.use('/api/auth', authRoutes);     
app.use('/api/students', userRoutes);

app.listen(appConfig.PORT, () => {
  console.log(`Server running at http://localhost:${appConfig.PORT}`);
});
