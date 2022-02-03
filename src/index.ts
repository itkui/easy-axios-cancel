import { RegistryCancelOption } from "../types/easy-axios-cancel"
import { cancelKeyCheck, cancelProvide, errorMerge } from "./utils/utils"

const registryCancelOption: RegistryCancelOption = (axios) => {
  axios.interceptors.request.use((req) => {
    const cancelKeySymbol = cancelKeyCheck(req)

    if (cancelKeySymbol) {
      const removeCancel = cancelProvide(req, cancelKeySymbol)
      errorMerge(req, removeCancel)
    }

    return req;
  })
}

export default registryCancelOption