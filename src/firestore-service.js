// src/firestore-service.js
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase-config';

// Reference to the "transport" collection
const transportCollectionRef = collection(db, 'transport');
const driversCollectionRef = collection(db, 'drivers'); // Reference to the "drivers" collection

// Get all transport records
export const getAllTransports = async () => {
  try {
    const querySnapshot = await getDocs(transportCollectionRef);
    const transports = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return transports;
  } catch (error) {
    console.error("Error getting transport records:", error);
    throw error;
  }
};

// Get transports filtered by route
export const getTransportsByRoute = async (routeName) => {
  try {
    const q = query(transportCollectionRef, where("route", "==", routeName));
    const querySnapshot = await getDocs(q);
    const transports = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return transports;
  } catch (error) {
    console.error("Error getting transports by route:", error);
    throw error;
  }
};

// Get transports sorted by departure time
export const getTransportsByDepartureTime = async () => {
  try {
    const q = query(transportCollectionRef, orderBy("Departure time"));
    const querySnapshot = await getDocs(q);
    const transports = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return transports;
  } catch (error) {
    console.error("Error getting transports by departure time:", error);
    throw error;
  }
};

// Get a single transport record by its ID
export const getTransportById = async (id) => {
  try {
    const transportDocRef = doc(db, 'transport', id);
    const docSnap = await getDoc(transportDocRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such transport document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting transport record:", error);
    throw error;
  }
};

// Get a single driver record by their driver_no
export const getDriverByDriverNo = async (driverNo) => {
  try {
    const q = query(driversCollectionRef, where("driver_no", "==", driverNo));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    } else {
      console.log(`No driver found with driver_no: ${driverNo}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting driver by driver_no:", error);
    throw error;
  }
};

// Add a new transport record
export const addTransport = async (transportData) => {
  try {
    const docRef = await addDoc(transportCollectionRef, transportData);
    return { id: docRef.id, ...transportData };
  } catch (error) {
    console.error("Error adding transport:", error);
    throw error;
  }
};

// Update a transport record
export const updateTransport = async (id, updatedData) => {
  try {
    const transportDoc = doc(db, "transport", id);
    await updateDoc(transportDoc, updatedData);
    return { id, ...updatedData };
  } catch (error) {
    console.error("Error updating transport:", error);
    throw error;
  }
};

// Delete a transport record
export const deleteTransport = async (id) => {
  try {
    const transportDoc = doc(db, "transport", id);
    await deleteDoc(transportDoc);
    return id;
  } catch (error) {
    console.error("Error deleting transport:", error);
    throw error;
  }
};