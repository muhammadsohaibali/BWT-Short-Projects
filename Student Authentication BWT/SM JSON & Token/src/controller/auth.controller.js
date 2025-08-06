const config = require('../config/appConfig')
const { getDB } = require('../config/dbConfig')
const jwt = require('jsonwebtoken')

async function login(req, res) {
    try {
        const users = getDB()
        const token = req.cookies?.token

        if (token) {
            try {
                const decodedToken = jwt.verify(token, config.JWT_SECRET)
                const user = users.find(u => u.username === decodedToken.username && !u.deleted)
                if (user) {
                    res.cookie('error-cookie', 'Already Logged In')
                    return res.redirect('/dashboard')
                }
            } catch (error) {
                res.clearCookie('token')
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

        const checkPassword = user.password === password
        if (!checkPassword) {
            res.cookie('error-cookie', 'Invalid Credentials')
            res.cookie('username-cookie', username)
            return res.redirect('/login')
        }

        const newToken = jwt.sign({ username }, config.JWT_SECRET)
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000 * 24 * 30
        })

        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.cookie('error-cookie', 'Internal Server Error')
        return res.redirect('/login')
    }
}

async function logout(req, res) {
    try {
        const token = req.cookies?.token
        if (!token) return res.redirect('/')

        res.clearCookie('token')
        return res.redirect('/')
    } catch (error) {
        console.log(error)
        res.cookie('error-cookie', 'Internal server error')
        return res.redirect('/')
    }
}

module.exports = { login, logout }