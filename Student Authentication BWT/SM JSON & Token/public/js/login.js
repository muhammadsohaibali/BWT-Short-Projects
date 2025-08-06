document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('error-div');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('user').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            return showError('Both fields are required.');
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!data.success) {
                return showError(data?.error || 'Invalid login credentials.');
            }

            if (data.redirectTo) {
                location.assign(data.redirectTo)
            }

        } catch (err) {
            showError('Something went wrong. Please try again later.');
        }
    });

    function showError(message) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
    }
});
