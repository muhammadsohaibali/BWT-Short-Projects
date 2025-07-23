const config = require('./config')
const fs = require('fs')

let db = null;

function getDB() {
    if (db) return db;
    const data = fs.readFileSync(config.DB_FILE, 'utf-8')
    db = JSON.parse(data)
    return db;
}

function writeDB(newData) {
    if (!newData || !Array.isArray(newData)) throw new Error('Enter A Valid Data To Write To DB')

    try { fs.writeFileSync(config.DB_FILE, JSON.stringify(newData, null, 2)) }
    catch (err) { throw new Error(err) }
}

module.exports = { getDB, writeDB }
