import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getAllUsers() {
  const usersCollcetion = collection(db, 'users')
  const users = await getDocs(usersCollcetion)
  const usersList = users.docs.map(doc => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })
  return usersList
}

export {
  getAllUsers
}