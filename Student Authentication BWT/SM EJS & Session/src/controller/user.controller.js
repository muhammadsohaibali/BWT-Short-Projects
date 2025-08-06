const { getDB, writeDB } = require('../config/dbConfig')

function addUser(req, res) {
    try {
        const users = getDB()
        const newFields = req.body;
        if (!newFields || typeof newFields !== 'object')
            return res.json({ success: false, error: 'Enter A Valid User Data' });

        const { username, fullName, phone, address, rollNo, dob, password } = newFields
        users.push({ username, fullName, phone, address, rollNo, dob, password })

        writeDB(users)
        res.status(200).json({
            success: true, data: { username, fullName, phone, address, rollNo, dob, password }
        })
    } catch (error) {
        res.json({ success: false, error: error.message })
    }
}

function getUsers(req, res) {
    try {
        const db = getDB()
        const users = db.filter(user => !user.deleted)
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        res.json({ success: false, error: error.message })
    }
}

function getUser(req, res) {
    try {
        const { username } = req.params;
        if (!username) return res.json({ success: false, error: 'Enter A Valid Username' });

        const users = getDB();
        const user = users.find(u => u.username === username && !u.deleted);
        if (!user) return res.json({ success: false, error: 'User Not Found' });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}

function updateUser(req, res) {
    try {
        const { username } = req.params;
        const newFields = req.body;

        if (!username) return res.json({ success: false, error: 'Enter A Valid Username' });
        if (!newFields || typeof newFields !== 'object')
            return res.json({ success: false, error: 'Enter A Valid User Data' });

        const users = getDB();
        const userIndex = users.findIndex(u => u.username === username);

        if (userIndex === -1) return res.json({ success: false, error: 'User Not Found' });

        users[userIndex] = { ...users[userIndex], ...newFields };
        writeDB(users);

        res.status(200).json({ success: true, message: 'User Updated' });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}

function deleteUser(req, res) {
    try {
        const username = req.params.username;
        if (!username) return res.json({ success: false, error: 'Enter A Valid Username' });

        const allUsers = getDB();
        const user = allUsers.find(user => user.username === username);

        if (!user || user.deleted)
            return res.json({ success: false, error: 'User Not Found' });

        user.deleted = true;
        writeDB(allUsers);

        res.status(200).json({ success: true, message: 'User Deleted' });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
}

module.exports = { addUser, getUsers, getUser, deleteUser, updateUser };
