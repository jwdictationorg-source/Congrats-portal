import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    OAuthProvider,
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: "user",
            createdAt: new Date().toISOString()
        });
    } catch (e) {
        console.error(e);
    }
    
    return user;
};

export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName || "Google Vartotojas",
                email: user.email,
                role: "user",
                avatar: user.photoURL || "",
                createdAt: new Date().toISOString()
            });
        }
    } catch (e) {
        console.error(e);
    }
    
    return user;
};

export const loginWithApple = async () => {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName || "Apple Vartotojas",
                email: user.email || "",
                role: "user",
                avatar: user.photoURL || "",
                createdAt: new Date().toISOString()
            });
        }
    } catch (e) {
        console.error(e);
    }
    
    return user;
};

export const logoutUser = () => signOut(auth);

export const getUserRole = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists() ? userDoc.data().role : 'user';
    } catch (e) {
        return 'user';
    }
};

export { onAuthStateChanged };
