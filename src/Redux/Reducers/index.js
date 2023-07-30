import KEY from "utils/Const"
import { combineReducers } from "redux"
import customer from "./Customer"

const dfUser = {
  name: "",
  client_ip: "",
  avatar: ""
}

const initialState = {
  user: dfUser,
  menu: [],
  countModalBlock: 0,
  permissions: [],
  advance_menu: []
}

export const info = (state, aciton) => {
  if (typeof state === "undefined") {
    return initialState
  }
  switch (aciton.type) {
    case KEY.SET_USER:
      return { ...state, ...aciton.payload }
    case KEY.SET_LINK:
      return { ...state, menus: aciton.payload ? aciton.payload : [] }
    case KEY.SET_CONFIG:
      return { ...state, config: aciton.payload ? aciton.payload : {} }
    case KEY.SHOW_MODAL_BLOCK:
      return { ...state, countModalBlock: state.countModalBlock + 1 }
    default:
      return state
  }
}

export default combineReducers({
  info,
  customer
})
