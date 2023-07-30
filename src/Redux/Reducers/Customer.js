import KEY from "utils/Const"

const initialState = {
  history: {}
}

const CustomerReducer = (state, aciton) => {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (aciton.type) {
    case KEY.CUSTOMER_HISTORY:
      return { ...state, history: aciton.payload }
    default:
      return state
  }
}

export default CustomerReducer
