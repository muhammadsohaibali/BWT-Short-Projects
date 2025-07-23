const { getDB } = require('../config/dbConfig')
const config = require('../config/appConfig')
const jwt = require('jsonwebtoken')

function checkGuest(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        if (!next) return true
        return next()
    };

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        if (!next) return true
        return next()
    }

    if (!decodedToken || !decodedToken.username) {
        if (!next) return true
        return next()
    }

    const users = getDB();
    const user = users.find(u => u.username === decodedToken.username && !u.deleted);

    if (user) {
        if (!next) return false;
        return res.status(403).json({ success: false, error: 'Already logged in' });
    }

    if (!next) return true;
    return next();
}

module.exports = checkGuest