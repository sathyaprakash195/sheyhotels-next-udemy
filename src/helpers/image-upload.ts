import { firebaseApp } from "@/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UploadImageToFirebaseAndReturnUrls = async (files: File[]) => {
  try {
    // upload images to firebase storage
    const storage = getStorage(firebaseApp);
    const uploadedImagesRefs = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    // get the urls of the images uploaded

    const urls = await Promise.all(
      uploadedImagesRefs.map(async (ref) => {
        const url = await getDownloadURL(ref);
        return url;
      })
    );

    return urls;
  } catch (error: any) {
    throw new Error(error);
  }
};
