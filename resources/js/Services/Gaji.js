import { useState } from "react";
import db from "@/firebase";
import { collection, getDocs, doc, addDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { getAll as getKaryawan } from './Karyawan'
import { getAll as getJabatan } from './Jabatan'

async function getDataGaji() {
  const [lists, setLists] = useState([])
  const [jabatans, setJabatan] = useState([])
  Promise.all([
    () => getJabatan().then(items => setJabatan(items)),
    () => getKaryawan().then(items => {
      const employees = items.map(employee => {
        const jab = jabatans.find(item => item.id == employee.data.jabatan.id)
        // TODO: fetch potongan
        return {
          ...employee,
          gajiPokok: jab.gajiPokok,
          tunjangan: jab.tunjangan,
          feePenjualan: jab.feePenjualan,
          transport: jab.transport,
          uangMakan: jab.uangMakan,
          bonus: jab.bonus,
          total: jab.total
        }
      })

      setLists(employees)
    }),
  ])
  
  return lists
}