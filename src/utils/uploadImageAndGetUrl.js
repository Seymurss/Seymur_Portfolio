// src/utils/uploadImageAndGetUrl.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImageAndGetUrl = async (file) => {
  if (!file) return "";

  const imageRef = ref(storage, `project_images/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(imageRef, file); // Bu POST edir
  const downloadURL = await getDownloadURL(snapshot.ref); // Bu GET edir

  return downloadURL;
};
