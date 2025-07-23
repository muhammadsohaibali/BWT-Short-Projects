const { getDB } = require('../config/db')
const tokenParser = require('./tokenParser')

function checkGuest(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        if (!next) return true
        return next()
    };

    const decodedToken = tokenParser(token);
    if (!decodedToken || !decodedToken.username || !decodedToken.password) {
        if (!next) return true
        return next()
    }

    const users = getDB();
    const user = users.find(u =>
        u.username === decodedToken.username &&
        u.password === decodedToken.password &&
        !u.deleted
    );

    if (user) {
        return res.status(403).json({ success: false, error: 'Already logged in' });
    }
    if (!next) return false
    next()
}
