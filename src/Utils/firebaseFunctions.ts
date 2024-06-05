import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { IReservation } from "../store/reservation-context";
const firebaseKey = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "myathenspath.firebaseapp.com",
  projectId: "myathenspath",
  storageBucket: "myathenspath.appspot.com",
  messagingSenderId: "967181134154",
  appId: "1:967181134154:web:3823f023c687ccee9739b3",
  measurementId: "G-VMJ2NE10KT",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
const RESERVATIONS_COLLECTION = "Reservations";

export async function updateStoreTemplates(
  storeId: string,
  emailSubjectTemplate: string,
  emailTextTemplate: string
): Promise<void> {
  try {
    const storeRef = doc(db, "shopsDetails", "rasdobknEsThHZMrhzy4");
    await updateDoc(storeRef, {
      emailSubjectTemplate,
      emailTextTemplate,
    });
    console.log("Store email templates updated successfully");
  } catch (error) {
    console.error("Error updating store email templates:", error);
    throw error;
  }
}

export async function getReservations(): Promise<IReservation[]> {
  try {
    const querySnapshot = await getDocs(
      collection(db, RESERVATIONS_COLLECTION)
    );
    console.log(querySnapshot.docs);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(documents);
    return documents as IReservation[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
