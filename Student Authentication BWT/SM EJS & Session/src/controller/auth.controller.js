const { getDB } = require('../config/dbConfig')
const crypto = require('crypto')

exports.sessions = []

exports.login = async (req, res) => {
    try {
        const users = getDB()
        const sessionId = req.cookies?.sessionId

        if (sessionId) {
            const existingSession = exports.sessions.find(s => s.sessionId === sessionId)
            const user = existingSession && users.find(u => u.id === existingSession.userId && !u.deleted)

            if (user) {
                res.cookie('error-cookie', 'Already Logged In')
                return res.redirect('/dashboard')
            }
        }

        const { username, password } = req.body

        if (!username || !password) {
            res.cookie('error-cookie', 'Username and password are required')
            return res.redirect('/login')
        }

        const user = users.find(u => u.username === username && !u.deleted)
        if (!user) {
            res.cookie('error-cookie', 'User not found')
            res.cookie('username-cookie', username)
            return res.redirect('/login')
        }

        if (user.password !== password) {
            res.cookie('error-cookie', 'Invalid Credentials')
            res.cookie('username-cookie', username)
            return res.redirect('/login')
        }

        const newSessionId = crypto.randomBytes(16).toString('hex')
        exports.sessions.push({ sessionId: newSessionId, username: user.username })

        res.cookie('sessionId', newSessionId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.cookie('error-cookie', 'Internal Server Error')
        return res.redirect('/login')
    }
}

exports.logout = async (req, res) => {
    try {
        const sessionId = req.cookies?.sessionId
        if (!sessionId) return res.redirect('/')

        const index = exports.sessions.findIndex(s => s.sessionId === sessionId)
        if (index !== -1) exports.sessions.splice(index, 1)

        res.clearCookie('sessionId')
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        res.cookie('error-cookie', 'Internal Server Error')
        return res.redirect('/')
    }
}
