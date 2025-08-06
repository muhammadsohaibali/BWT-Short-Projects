const { getDB } = require('../config/dbConfig')
const config = require('../config/appConfig')
const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        if (!next) return false
        return res.status(401).json({ success: false, error: 'No token provided' });
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        if (!next) return false
        return res.status(401).json({ success: false, error: 'Invalid token' })
    }

    if (!decodedToken || !decodedToken.username) {
        if (!next) return false
        return res.status(401).json({ success: false, error: 'Invalid token data' })
    }

    const users = getDB()
    const user = users.find(u => u.username === decodedToken.username && !u.deleted);

    if (!user) {
        if (!next) return false
        return res.status(404).json({ success: false, error: 'User Not Found' })
    }

    req.user = user

    if (!next) return true
    next()
}

module.exports = checkAuth
