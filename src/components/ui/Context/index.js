import { useReducer, useMemo, createContext, useContext } from "react"
import { setAuthLocal, removeAuthLocal, getAuthLocal, setConfig } from "lib/localstorage"
import KEY from "./Const"
import CONSTANT from "lib/constains"

function initialState() {
  let auth = {
    token: undefined,
    fullname: undefined,
    logo: "",
    role: undefined
  }
  if (getAuthLocal()) {
    auth = getAuthLocal()
  }
  return {
    ...auth
  }
}

function reducer(state, action) {
  switch (action.type) {
    case KEY.SET_AUTH:
      return { ...state, ...action.value }
    case KEY.LOG_OUT:
      removeAuthLocal()
      return initialState()
    default:
      throw new Error()
  }
}

const MyContext = createContext(initialState())
MyContext.displayName = "MyContext"

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState())

  const setAuth = (value) => {
    setAuthLocal(value)
    return dispatch({ type: KEY.SET_AUTH, value })
  }
  const setConfigTypes = (value) => {
    setConfig(CONSTANT.CONFIG_TYPE, value)
    return dispatch({ type: KEY.SET_CONFIG_TYPE, value })
  }
  const setConfigAges = (value) => {
    setConfig(CONSTANT.CONFIG_AGE, value)
    return dispatch({ type: KEY.SET_CONFIG_AGE, value })
  }
  const setCategories = (value) => {
    setConfig(CONSTANT.CATEGORY, value)
    return dispatch({ type: KEY.SET_CONFIG_CATEGORY, value })
  }

  const logOut = () => dispatch({ type: KEY.LOG_OUT })

  const value = useMemo(
    () => ({
      ...state,
      setAuth,
      logOut,
      setConfigTypes,
      setConfigAges,
      setCategories
    }),
    [state]
  )
  return <MyContext.Provider value={value} {...props} />
}

const useStore = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export default useStore
