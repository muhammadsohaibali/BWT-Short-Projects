const checkAuth = require('../middleware/checkAuth');
const path = require('path');

const BASE_PATH = path.join(__dirname, '../../public/pages');

exports.home = (req, res) => {
    const isAuth = checkAuth(req, res);
    return isAuth
        ? res.redirect('/dashboard')
        : res.redirect('/login');
};

exports.dashboard = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');
    return res.sendFile(path.join(BASE_PATH, 'dashboard.html'));
};

exports.allStudents = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');
    return res.sendFile(path.join(BASE_PATH, 'all-students.html'));
};

exports.profile = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (!isAuth) return res.redirect('/login');
    return res.sendFile(path.join(BASE_PATH, 'profile.html'));
};

exports.login = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (isAuth) return res.redirect('/dashboard');
    return res.sendFile(path.join(BASE_PATH, 'login.html'));
};

exports.forgotPassword = (req, res) => {
    const isAuth = checkAuth(req, res);
    if (isAuth) return res.redirect('/dashboard');
    return res.sendFile(path.join(BASE_PATH, 'forgot-password.html'));
};
