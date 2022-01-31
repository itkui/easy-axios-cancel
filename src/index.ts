import axios, { Axios } from "axios"
import { RegistryCancelOption } from "../types/easy-axios-cancel"
import { cancelKeyCheck } from "./utils/utils"

const registryCancelOption: RegistryCancelOption = (axios) => {
  axios.interceptors.request.use((req) => {
    const cancelKeySymbol = cancelKeyCheck(req)



  })
}

export default registryCancelOption