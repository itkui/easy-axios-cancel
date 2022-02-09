import { RegistryCancelOption } from "../types/easy-axios-cancel"
import { cancelKeyCheck, cancelProvide, errorMerge } from "./utils/utils"

const registryCancelOption: RegistryCancelOption = (axios) => {
  axios.interceptors.request.use((req) => {
    const cancelKeySymbol = cancelKeyCheck(req)

    if (cancelKeySymbol) {
      const removeCancel = cancelProvide(req, cancelKeySymbol)
      errorMerge(req, (data) => {
        removeCancel();
        return data
      })
    }

    return req;
  })
}

export default registryCancelOption