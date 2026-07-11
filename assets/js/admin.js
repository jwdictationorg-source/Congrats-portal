import { auth, onAuthStateChanged, getUserRole } from '../../firebase/authentication.js';

const adminContent = document.getElementById('admin-content');
const loader = document.getElementById('loader');

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const role = await getUserRole(user.uid);
        if (role === 'admin') {
            loader.style.display = 'none';
            adminContent.style.display = 'block';
        } else {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'login.html';
    }
});
