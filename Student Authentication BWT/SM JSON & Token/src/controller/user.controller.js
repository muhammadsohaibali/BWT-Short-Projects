const { getDB, writeDB } = require('../config/dbConfig');

exports.addUser = function (req, res) {
    try {
        const users = getDB();
        const newFields = req.body;

        if (!newFields || typeof newFields !== 'object')
            return res.status(400).json({ success: false, error: 'Invalid user data' });

        const { username, fullName, phone, address, rollNo, dob, password } = newFields;

        if (!username || !password) {
            return res.status(400).json({ success: false, error: 'Username and password are required' });
        }

        const userExists = users.find(u => u.username === username && !u.deleted);
        if (userExists) {
            return res.status(409).json({ success: false, error: 'User already exists' });
        }

        const newUser = { username, fullName, phone, address, rollNo, dob, password };
        users.push(newUser);
        writeDB(users);

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUsers = function (req, res) {
    try {
        const users = getDB().filter(user => !user.deleted);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUser = function (req, res) {
    try {
        const { username } = req.params;
        if (!username) return res.status(400).json({ success: false, error: 'Username is required' });

        const users = getDB();
        const user = users.find(u => u.username === username && !u.deleted);

        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateUser = function (req, res) {
    try {
        const { username } = req.params;
        const newFields = req.body;

        if (!username) return res.status(400).json({ success: false, error: 'Username is required' });
        if (!newFields || typeof newFields !== 'object')
            return res.status(400).json({ success: false, error: 'Invalid update data' });

        const users = getDB();
        const userIndex = users.findIndex(u => u.username === username && !u.deleted);

        if (userIndex === -1) return res.status(404).json({ success: false, error: 'User not found' });

        users[userIndex] = { ...users[userIndex], ...newFields };
        writeDB(users);

        res.status(200).json({ success: true, message: 'User updated' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteUser = function (req, res) {
    try {
        const { username } = req.params;
        if (!username) return res.status(400).json({ success: false, error: 'Username is required' });

        const users = getDB();
        const user = users.find(u => u.username === username && !u.deleted);

        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        user.deleted = true;
        writeDB(users);

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getCurrentUser = function (req, res) {
    try {
        const { user } = req;
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
