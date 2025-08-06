const { getDB } = require('../config/dbConfig')
const { sessions } = require('../controller/auth.controller')

function checkGuest(req, res, next) {
    const sessionId = req.cookies?.sessionId
    if (!sessionId) {
        if (!next) return true
        return next()
    }

    const session = sessions.find(s => s.sessionId === sessionId)
    if (!session) {
        if (!next) return true
        return next()
    }

    const users = getDB()
    const user = users.find(u => u.id === session.userId && !u.deleted)

    if (user) {
        if (!next) return false
        return res.status(403).json({ success: false, error: 'Already logged in' })
    }

    if (!next) return true
    return next()
}

module.exports = checkGuest