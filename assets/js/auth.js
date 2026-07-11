import { registerUser, loginUser, loginWithGoogle } from '../../firebase/authentication.js';
import { showToast } from './app.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const googleBtn = document.getElementById('google-btn');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('login-btn');
        
        btn.textContent = 'Kraunama...';
        btn.disabled = true;

        try {
            await loginUser(email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            showToast(error.message, 'error');
            btn.textContent = 'Prisijungti';
            btn.disabled = false;
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('register-btn');
        
        btn.textContent = 'Kraunama...';
        btn.disabled = true;

        try {
            await registerUser(email, password, name);
            window.location.href = 'dashboard.html';
        } catch (error) {
            showToast(error.message, 'error');
            btn.textContent = 'Registruotis';
            btn.disabled = false;
        }
    });
}

if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        try {
            await loginWithGoogle();
            window.location.href = 'dashboard.html';
        } catch (error) {
            showToast(error.message, 'error');
        }
    });
}
