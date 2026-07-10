import { auth, db } from '../firebase/firebase-config.js';
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { showToast } from './app.js';

const profileContent = document.getElementById('profile-content');
const loader = document.getElementById('loader');
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('profile-name');
const emailInput = document.getElementById('profile-email');
const roleInput = document.getElementById('profile-role');
const saveBtn = document.getElementById('save-btn');
const avatarPlaceholder = document.getElementById('avatar-placeholder');

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const displayName = userData.name || user.displayName || '';
                
                nameInput.value = displayName;
                emailInput.value = userData.email || user.email || '';
                roleInput.value = userData.role || 'user';
                
                avatarPlaceholder.textContent = displayName ? displayName.charAt(0).toUpperCase() : 'U';
            }

            loader.style.display = 'none';
            profileContent.style.display = 'block';
        } catch (error) {
            showToast(error.message, 'error');
        }
    } else {
        window.location.href = 'login.html';
    }
});

if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = nameInput.value.trim();
        
        saveBtn.textContent = 'Saugoma...';
        saveBtn.disabled = true;

        try {
            await updateProfile(currentUser, {
                displayName: newName
            });

            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                name: newName
            });

            avatarPlaceholder.textContent = newName.charAt(0).toUpperCase();
            showToast('Profilis sėkmingai atnaujintas!', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            saveBtn.textContent = 'Išsaugoti pakeitimus';
            saveBtn.disabled = false;
        }
    });
}
