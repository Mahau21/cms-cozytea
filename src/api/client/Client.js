import getInstanceAxios from "utils/request"
import config from "data/config"
const baseDomain = process.env.REACT_APP_DOMAIN
const baseURL = baseDomain + config.version

export default getInstanceAxios(baseURL)
