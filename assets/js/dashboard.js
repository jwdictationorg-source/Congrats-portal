import { auth, onAuthStateChanged, logoutUser, getUserRole } from '../../firebase/authentication.js';

const dashboardContent = document.getElementById('dashboard-content');
const loader = document.getElementById('loader');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const adminLink = document.getElementById('admin-link');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        userName.textContent = user.displayName || 'Vartotojau';
        userEmail.textContent = user.email;
        
        const role = await getUserRole(user.uid);
        if (role === 'admin') {
            adminLink.style.display = 'inline-block';
        }
        
        loader.style.display = 'none';
        dashboardContent.style.display = 'block';
    } else {
        window.location.href = 'login.html';
    }
});

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await logoutUser();
        window.location.href = 'login.html';
    });
}
