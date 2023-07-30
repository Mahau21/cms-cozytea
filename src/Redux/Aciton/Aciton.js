import KEY from "utils/Const"
// import getFactory from "api"
// const API_USER = getFactory("user")
// const API_CUSTOMER = getFactory("customer")

export const setHistoryCustomer = (idCustomer) => async (dispatch) => {
  try {
    let list = {}
    if (idCustomer) {
      // const { data } = await API_CUSTOMER.getCustomerDetail(idCustomer)
      // list = data
    }
    dispatch({
      type: KEY.CUSTOMER_HISTORY,
      payload: list
    })
  } catch (e) {
    // console.log(e.message);
  }
}
