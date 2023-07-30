import axios from "axios"
import { notification } from "antd"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import { getAuthLocal } from "lib/localstorage"
import KEY from "./Const"

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${process.env.REACT_APP_DOMAIN}/refresh`, {
      refreshToken: getAuthLocal()?.refreshToken
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("accessToken", tokenRefreshResponse.data.token)

      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${tokenRefreshResponse.data.token}`

      return Promise.resolve()
    })
    .catch(() => {
      localStorage.clear()
      window.location.href = "/login"
    })

export default function getInstanceAxios(baseAPI) {
  const instance = axios.create({
    baseURL: baseAPI
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true })
  })
  instance.interceptors.request.use(
    function (config) {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
        // Authorization: getAuthLocal() ? `Bearer ${getAuthLocal()?.token}` : undefined
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      try {
        if (response.status >= 200 && response.status < 300) return response.data
        return Promise.reject(response.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async function (error) {
      if (error.response) {
        const { response } = error
        console.log({ response })
        // debugger
        const { data, status } = response
        if (data.message && status !== 401) {
          let str = ""
          if (typeof data.message === "string") {
            str = data.message
          } else {
            data.message.forEach((item) => {
              Object.keys(item).forEach((i) => {
                let __message = i + ": " + item[i] + "<br>"
                str += __message
              })
            })
          }
          notification.error({
            message: "Thông báo!",
            description: <div dangerouslySetInnerHTML={{ __html: str }}></div>,
            duration: 3
          })
        } else if (response.status === 401) {
          localStorage.removeItem("accessToken")
        } else {
          notification.error({
            description: KEY.ERROR
          })
        }
      }
      return Promise.reject(error)
    }
  )
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  return instance
}
