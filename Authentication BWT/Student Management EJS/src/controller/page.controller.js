const checkAuth = require('../middleware/checkAuth');
const { getDB } = require('../config/dbConfig');

exports.home = (req, res) => {
    const isAuth = checkAuth(req, res);
    return isAuth ? res.redirect('/dashboard') : res.redirect('/login');
};

exports.dashboard = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');
    res.render('dashboard', { data: { userData: req.user } });
};

exports.allStudents = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');

    const allStudents = getDB(); // should be async if needed
    res.render('all-students', { data: { userData: req.user, allStudents } });
};

exports.profile = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');
    res.render('profile', { data: { userData: req.user } });
};

exports.login = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (isAuth) return res.redirect('/dashboard');

    const error = req.cookies?.['error-cookie'] || null;
    res.clearCookie('error-cookie');

    const username = req.cookies?.['username-cookie'] || null;
    res.clearCookie('username-cookie');

    res.render('login', { data: { error, username } });
};

exports.forgotPassword = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (isAuth) return res.redirect('/dashboard');
    res.render('forgot-password');
};
