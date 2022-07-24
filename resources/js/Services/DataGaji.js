import { getByPeriode } from './Absensi'
import { getAll as getJabatan } from './Jabatan'
import { getAll as getPotongan } from './SettingPotonganGaji'
import { toast } from "react-toastify";

async function getDataGaji(periode, setLists) {
  let potongan = []
  getJabatan()
    .then(jabatans => {
      getByPeriode(periode).then(items => {
          if(items[0] == undefined) {
            setLists([])
            toast.error("data tidak tersedia")
            return
          }
          getPotongan()
          .then(p => p.map(item => {
            potongan.push(item)
          }))
          .finally(() => {
            let alfa = potongan.find(pot => pot.data.jenis == 'alfa')
            let sakit = potongan.find(pot => pot.data.jenis == 'sakit')

            let employees = items[0].data.users.map(employee => {
            let jab = jabatans.find(item => item.id == employee.jabatan_id)

            let potong = 0
            if(alfa != undefined) {
              potong += +alfa.data.potongan * +employee.alfa
            }
            if(sakit != undefined) {
              potong += +sakit.data.potongan * +employee.sakit
            }

            return {
              ...employee,
              gajiPokok: jab.data.gajiPokok,
              tunjangan: jab.data.tunjangan,
              feePenjualan: jab.data.feePenjualan,
              transport: jab.data.transport,
              uangMakan: jab.data.uangMakan,
              bonus: jab.data.bonus,
              potongan: potong,
              total: +jab.data.total - +potong
            }
          })
          setLists(employees)
        })
          
        })
    })
}

export {
  getDataGaji
}