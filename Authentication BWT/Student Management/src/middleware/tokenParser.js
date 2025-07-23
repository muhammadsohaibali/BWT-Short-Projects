function tokenParser(token) {
    try {
        const parts = token.split(';');
        if (parts.length !== 2) return null;

        const usernamePart = parts[0].split(':');
        const passwordPart = parts[1].split(':');

        if (usernamePart[0] !== 'username' || passwordPart[0] !== 'password') return null;

        return {
            username: usernamePart[1],
            password: passwordPart[1]
        }
    } catch (error) {
        return null
    }
}

module.exports = tokenParser