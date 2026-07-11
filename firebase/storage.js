import { storage } from './firebase-config.js';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

export const uploadFile = async (path, file) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const deleteFile = async (path) => {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
};
