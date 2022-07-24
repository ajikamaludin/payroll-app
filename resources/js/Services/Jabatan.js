import db from "@/firebase";
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const COLLECTION = "jabatan"

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
  console.log(id)
  const docRef = doc(db, COLLECTION, id)
  const result = await deleteDoc(docRef);
  return result
}

export {
  getAll,
  create,
  update,
  deleteById
}