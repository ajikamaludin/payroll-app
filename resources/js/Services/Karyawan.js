import db from "@/firebase";
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const COLLECTION = "users"

async function getAll() {
  const collect = collection(db, COLLECTION)
  const data = await getDocs(collect)
  const lists = data.docs.map(doc => { 
    return {
      data: doc.data(),
      id: doc.id
    }
  })
  return lists
}

async function create(payload) {
  const docRef = await addDoc(collection(db, COLLECTION), payload)
  return docRef.id
}

async function update(payload, id){
  const docRef = doc(db, COLLECTION, id)
  const result = await updateDoc(docRef, payload);
  return result
}

async function deleteById(id) {
  const docRef = doc(db, COLLECTION, id)
  const result = await deleteDoc(docRef);
  return result
}

async function uploadImage(url = '', profile) {
  const formData = new FormData();

  formData.append('profile', profile);
  return await fetch(url, {
  method: 'POST',
  body: formData
  })
  .then(res => res.json())
  .then(res => {
    return res
  })
  .catch((error) => {
    throw error
  });
}

export {
  getAll,
  create,
  update,
  deleteById,
  uploadImage
}