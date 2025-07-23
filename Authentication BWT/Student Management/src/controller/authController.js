const { getDB, writeDB } = require('../config/db')
const tokenParser = require('../middleware/tokenParser')

async function login(req, res) {
    try {
        const users = getDB()
        const token = req.cookies?.token
        if (token) {
            const decodedToken = tokenParser(token)
            const user = users.find(u =>
                u.username === decodedToken.username
                && u.password === decodedToken.password
                && !u.deleted
            )
            if (user) return res.status(403).json({ success: false, error: 'Already Logged In' })
            else res.clearCookie('token')
        }
        const { username, password } = req.body || {}
        if (!username || !password)
            return res.status(400).json({ success: false, error: 'Invalid Form Data' })

        const user = users.find(u => u.username === username && !u.deleted)
        if (!user) return res.status(404).json({ success: false, error: 'User Not Found' })

        const checkPassword = user.password === password
        if (!checkPassword) return res.status(400).json({ success: false, error: 'Invalid Creadentials' })

        const newToken = `username:${username};password:${password}`
        res.cookie('token', newToken)
        res.status(200).json({ success: true, message: 'User Logged In Successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

async function register(req, res) {
    try {
        const users = getDB()
        const token = req.cookies?.token
        if (token) {
            const decodedToken = tokenParser(token)
            const user = users.find(u =>
                u.username === decodedToken.username
                && u.password === decodedToken.password
                && !u.deleted
            )
            if (user) return res.status(403).json({ success: false, error: 'Already Logged In' })
            else res.clearCookie('token')
        }

        const { username, password } = req.body || {}
        if (!username || !password)
            return res.status(400).json({ success: false, error: 'Invalid Form Data' })

        const user = users.find(u => u.username === username && !u.deleted)
        if (user) return res.status(409).json({ success: false, error: 'User Already Exists' })

        users.push({ username, password })
        writeDB(users)

        const newToken = `username:${username};password:${password}`
        res.cookie('token', newToken)
        res.status(200).json({ success: true, message: 'User Registered In Successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies?.token
        if (!token)
            return res.status(200).json({ success: true, message: 'User Logged Out Successfully' })

        res.clearCookie('token')
        return res.status(200).json({ success: true, message: 'User Logged Out Successfully' })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
}

module.exports = { login, register, logout }