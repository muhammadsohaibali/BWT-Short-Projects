const config = require('../config/appConfig');
const { getDB } = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const users = getDB();
        const token = req.cookies?.token;

        if (token) {
            try {
                const decoded = jwt.verify(token, config.JWT_SECRET);
                const user = users.find(u => u.username === decoded.username && !u.deleted);
                if (user) {
                    return res.status(200).json({
                        success: false,
                        error: 'Already logged in'
                    });
                }
            } catch {
                res.clearCookie('token');
            }
        }

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password are required'
            });
        }

        const user = users.find(u => u.username === username && !u.deleted);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        const isValid = user.password === password;
        if (!isValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const newToken = jwt.sign({ username }, config.JWT_SECRET);
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            redirectTo: '/dashboard'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};


exports.logout = async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.redirect('/login');
        }

        res.clearCookie('token');

        return res.redirect('/login');
    } catch (err) {
        console.error(err);
        return res.redirect('/login');
    }
};
