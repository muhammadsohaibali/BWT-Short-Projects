// LOGIN PAGE
const loginForm = document.getElementById('login-form')
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(loginForm)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        handleLogin(data)
    })
}

const usernameInp = document.getElementById('user')
if (usernameInp) {
    usernameInp.focus()
    usernameInp.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const passwordInp = document.getElementById('password')
            if (passwordInp) passwordInp.focus()
        }
    })
}

// LOGOUT BTN
const logoutbtns = ['logout-btn-1', 'logout-btn-2']
logoutbtns.forEach(btnId => {
    const btn = document.getElementById(btnId)
    if (btn) btn.addEventListener('click', handleLogout)
})

// FETCH REQUESTS
async function handleLogin(user) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    const data = await res.json()
    console.log(data)

    if (data.success) location.assign('/')
}

async function handleLogout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await res.json()
    if (data.success) location.assign('/')
}
