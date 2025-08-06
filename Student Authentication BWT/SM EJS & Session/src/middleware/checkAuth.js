const { getDB } = require('../config/dbConfig')
const { sessions } = require('../controller/auth.controller')

function checkAuth(req, res, next) {
    const sessionId = req.cookies?.sessionId
    if (!sessionId) {
        if (!next) return false
        return res.status(401).json({ success: false, error: 'No session found' })
    }

    const session = sessions.find(s => s.sessionId === sessionId)
    if (!session) {
        if (!next) return false
        return res.status(401).json({ success: false, error: 'Invalid session' })
    }

    const users = getDB()
    const user = users.find(u => u.id === session.userId && !u.deleted)

    if (!user) {
        if (!next) return false
        return res.status(404).json({ success: false, error: 'User not found' })
    }

    req.user = user

    if (!next) return true
    next()
}

module.exports = checkAuth
