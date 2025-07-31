const path = require('path')
require('dotenv').config()

module.exports = {
    DB_FILE: path.join(__dirname, '../database/users.json'),
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT || 3000
}
