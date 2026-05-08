import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AppPolicy {
  id: string;
  name: string;
  policyContent: string;
  lastUpdated: string;
}

export function usePolicies() {
  const [policies, setPolicies] = useState<AppPolicy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'policies');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const policiesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          policyContent: data.policyContent || '',
          lastUpdated: data.lastUpdated || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        } as AppPolicy;
      });
      setPolicies(policiesData);
      setLoading(false);
    }, (error: any) => {
      console.error("Error fetching policies:", error);
      if (error.code === 'permission-denied') {
        console.error("Firebase Permissions Error: Please update your Firestore Rules in the Firebase Console to allow read/write access.");
      } else {
        alert(`Failed to fetch policies: ${error.message}`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPolicy = async (policy: Omit<AppPolicy, 'id' | 'lastUpdated'>) => {
    const curDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    try {
      const docRef = await addDoc(collection(db, 'policies'), {
        ...policy,
        lastUpdated: curDate,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      console.error("Error adding policy:", error);
      alert("Failed to create policy: " + error.message);
      throw error;
    }
  };

  const editPolicy = async (id: string, updatedPolicy: Omit<AppPolicy, 'id' | 'lastUpdated'>) => {
    const curDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    try {
      const docRef = doc(db, 'policies', id);
      await updateDoc(docRef, {
        ...updatedPolicy,
        lastUpdated: curDate,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error("Error updating policy:", error);
      alert("Failed to update policy: " + error.message);
      throw error;
    }
  };

  const deletePolicy = async (id: string) => {
    try {
      const docRef = doc(db, 'policies', id);
      await deleteDoc(docRef);
    } catch (error: any) {
      console.error("Error deleting policy:", error);
      alert("Failed to delete policy: " + error.message);
      throw error;
    }
  };

  return { policies, loading, addPolicy, editPolicy, deletePolicy };
}
