document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    renderCurrentUser(await fetchCurrentUser())
    renderUsers(await fetchStudents());
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

function renderUsers(users) {
    const tbody = document.getElementById('students-list');

    tbody.innerHTML = users.map(user => `
        <tr>
            <td><input type="checkbox" /></td>
            <td>${user.fullname}</td>
            <td>${user.rollNo}</td>
            <td>${user.address}</td>
            <td>${user.dob}</td>
            <td>${user.phone}</td>
            <td class="action-buttons">
                <button class="btn update-btn">
                    <i class='bx bx-edit'></i> Update
                </button>
                <button class="btn delete-btn">
                    <i class='bx bx-trash'></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
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

async function fetchStudents() {
    try {
        const res = await fetch('/api/students', {
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

    return [];
}

async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
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
