// const MIN_USER_PASS_LENGTH = 4;
// const LOCALSTORAGE_AUTH_VAR = 'isAuthenticated';

// const AUTH_PAGES = ['login', 'forgot-password'];
// const NON_AUTH_PAGES = ['dashboard', 'all-students', 'student-profile']

// const CURRENT_PAGE = location.pathname.split('/').filter(Boolean).pop();

// const isLocal = ['127.0.0.1', '192.168.100.4', 'localhost'].includes(location.hostname);
// const BASE_PATH = isLocal
//     ? '/Projects/26-June-2025/Compiled/pages/'
//     : '/DevSquad/Projects/26-June-2025/Compiled/pages/'

// document.addEventListener('DOMContentLoaded', () => {
//     init();
// })

// function init() {
//     validateAuth(CURRENT_PAGE);
//     setupEventListeners()
// }

// function setupEventListeners() {
//     const forgotLink = document.getElementById('forgot-link');
//     const loginForm = document.getElementById('login-form');
//     const tabs = document.querySelectorAll('.div-tab');
//     const logoutBtn = document.getElementById('logout-btn');

//     const backToLogin = document.getElementById('back-to-login');
//     const myProfileBtn = document.getElementById('my-profile');
//     const myDashboard = document.getElementById('goto-dashboard');
//     const allStudents = document.getElementById('all-students')

//     if (forgotLink) {
//         forgotLink.addEventListener('click', (e) => {
//             e.preventDefault();
//             redirect('forgot-password');
//         });
//     }

//     if (backToLogin) {
//         backToLogin.addEventListener('click', (e) => {
//             e.preventDefault();
//             redirect('login');
//         });
//     }

//     if (tabs.length) {
//         tabs.forEach(tab => {
//             tab.addEventListener('click', () => {
//                 tabs.forEach(t => t.classList.remove('active'));
//                 tab.classList.add('active');
//             });
//         });
//     }

//     if (loginForm) {
//         loginForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const username = loginForm.querySelector('#user').value.trim();
//             const password = loginForm.querySelector('#password').value.trim();
//             authenticated(username, password);
//         });
//     }

//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', logout);
//     }

//     if (myProfileBtn) {
//         myProfileBtn.addEventListener('click', () => {
//             redirect('profile')
//         })
//     }

//     if (allStudents) {
//         allStudents.addEventListener('click', () => {
//             redirect('all-students')
//         })
//     }

//     if (myDashboard) {
//         myDashboard.addEventListener('click', () => {
//             redirect('dashboard')
//         })
//     }
// }

// function redirect(page) {
//     location.assign(BASE_PATH + (page ? `${page}/` : 'dashboard/'));
// }

// function validateAuth(page) {
//     const isAuthenticated = localStorage.getItem(LOCALSTORAGE_AUTH_VAR);

//     if (isAuthenticated && AUTH_PAGES.includes(CURRENT_PAGE)) return location.assign(BASE_PATH + 'dashboard/');

//     if (!isAuthenticated) {
//         if (!AUTH_PAGES.includes(CURRENT_PAGE)) location.assign(BASE_PATH + 'login/');
//         return;
//     }

//     if (page) {
//         if (page === CURRENT_PAGE) return;
//         return location.assign(BASE_PATH + page);
//     }

//     if (!AUTH_PAGES.includes(CURRENT_PAGE) && CURRENT_PAGE !== 'dashboard') location.assign(BASE_PATH + 'dashboard/');
// }

// function authenticated(username, password) {
//     if (!username) return console.log('Enter Username');
//     if (!password) return console.log('Enter Password');

//     if (username.length >= MIN_USER_PASS_LENGTH && password.length >= MIN_USER_PASS_LENGTH) {
//         localStorage.setItem(LOCALSTORAGE_AUTH_VAR, 'true');
//         validateAuth('dashboard/');
//     } else {
//         console.log(`Username & Password must be at least ${MIN_USER_PASS_LENGTH} characters long`);
//     }
// }

// function logout() {
//     localStorage.removeItem(LOCALSTORAGE_AUTH_VAR);
//     location.assign(BASE_PATH + 'login/');
// }

