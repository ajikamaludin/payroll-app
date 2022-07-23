import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getAllUsers() {
  const usersCollcetion = collection(db, 'users')
  const users = await getDocs(usersCollcetion)
  const usersList = users.docs.map(doc => doc.data())
  return usersList
}

export {
  getAllUsers
}