import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  IReservation,
  IStore,
  IStoreDetails,
} from "../Models/Context Models"
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
const STORES_DETAILS_COLLECTION = "shopsDetails";
const STORES_COLLECTION = "shops";

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

/* export async function getShopDetails(): Promise<IStoreDetails> {
} */

export async function getStore(storeEmail: string): Promise<IStore> {
  try {
    const q = query(
      collection(db, STORES_COLLECTION),
      where("reservationEmail", "==", storeEmail)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0].data() as IStore;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStoreDetails(storeId: string): Promise<IStoreDetails> {
  try {
    const q = query(
      collection(db, STORES_DETAILS_COLLECTION),
      where("storeId", "==", storeId)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs, storeId);
    return {
      ...querySnapshot.docs[0].data(),
      id: querySnapshot.docs[0].id,
    } as IStoreDetails;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateStoreDetails(
  storeDetails: IStoreDetails
): Promise<void> {
  try {
    const storeDocRef = doc(db, STORES_DETAILS_COLLECTION, storeDetails.id);
    await setDoc(storeDocRef, storeDetails, { merge: true });
    console.log(
      `Store details for ${storeDetails.storeId} updated successfully`
    );
  } catch (error) {
    console.log(
      `Error updating store details for ${storeDetails.storeId}:`,
      error
    );
    throw error;
  }
}

export async function getReservations(
  storeId: string
): Promise<IReservation[]> {
  try {
    // Create a query with a filter for reservationEmail === 'haha'
    const q = query(
      collection(db, RESERVATIONS_COLLECTION),
      where("storeId", "==", storeId)
    );

    const querySnapshot = await getDocs(q);
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
