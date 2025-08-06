document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    renderCurrentUser(await fetchCurrentUser())
    setupEventListeners();
}

function setupEventListeners() {
    document.querySelectorAll('.logout-class').forEach(btn => {
        btn.addEventListener('click', logout);
    });
}

function renderCurrentUser(user) {
    const { fullname } = user

    const usernameSpan = document.querySelector('.user-username')
    usernameSpan.textContent = fullname
}

async function fetchCurrentUser() {
    try {
        const res = await fetch('/api/students/me', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        const { success, data, error = null } = await res.json();
        if (success) return data;
        else console.error(`Failed to load students: ${error || ''}`);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        location.assign('/');
    } catch (error) {
        console.error('Logout error:', error);
        location.assign('/');
    }
}
