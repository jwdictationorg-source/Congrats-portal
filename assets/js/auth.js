import { registerUser, loginUser, loginWithGoogle, loginWithApple } from '../../firebase/authentication.js';
import { showToast } from './app.js';

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const googleBtn = document.getElementById('google-btn');
const appleBtn = document.getElementById('apple-btn');

const handleError = (error, btn, originalText) => {
    let msg = error.message;
    if (msg.includes('auth/invalid-credential')) msg = 'Neteisingas el. paštas arba slaptažodis.';
    if (msg.includes('auth/email-already-in-use')) msg = 'Šis el. paštas jau naudojamas.';
    if (msg.includes('auth/weak-password')) msg = 'Slaptažodis per silpnas (turi būti bent 6 simboliai).';
    if (msg.includes('auth/popup-closed-by-user')) msg = 'Prisijungimo langas buvo uždarytas.';
    
    showToast(msg, 'error');
    
    if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
};

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('login-btn');
        const originalText = btn.innerHTML;
        
        btn.textContent = 'Kraunama...';
        btn.disabled = true;

        try {
            await loginUser(email, password);
            showToast('Sėkmingai prisijungta!', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
        } catch (error) {
            handleError(error, btn, originalText);
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
        const originalText = btn.innerHTML;
        
        btn.textContent = 'Kraunama...';
        btn.disabled = true;

        try {
            await registerUser(email, password, name);
            showToast('Sėkmingai užsiregistruota!', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
        } catch (error) {
            handleError(error, btn, originalText);
        }
    });
}

if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
        const originalText = googleBtn.innerHTML;
        googleBtn.textContent = 'Kraunama...';
        googleBtn.disabled = true;
        
        try {
            await loginWithGoogle();
            showToast('Sėkmingai prisijungta!', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
        } catch (error) {
            handleError(error, googleBtn, originalText);
        }
    });
}

if (appleBtn) {
    appleBtn.addEventListener('click', async () => {
        const originalText = appleBtn.innerHTML;
        appleBtn.textContent = 'Kraunama...';
        appleBtn.disabled = true;
        
        try {
            await loginWithApple();
            showToast('Sėkmingai prisijungta!', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);
        } catch (error) {
            handleError(error, appleBtn, originalText);
        }
    });
}
