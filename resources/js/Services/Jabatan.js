import db from "@/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

async function getAllJabatan() {
  const collect = collection(db, 'jabatan')
  const data = await getDocs(collect)
  const lists = data.docs.map(doc => doc.data())
  return lists
}

async function createJabatan(payload) {
  const docRef = await setDoc(doc(db, "jabatan"), payload);
  return docRef.id
}

export {
  getAllJabatan,
  createJabatan
}