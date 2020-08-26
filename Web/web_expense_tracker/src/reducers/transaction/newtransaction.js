import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function new_transaction(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
        //same as in action type
    case Actions.NEW_TRANSACTION:
      return {
        isLoading: true,
        error: null,
        data: {}
      };

    case Actions.NEW_TRANSACTION_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data
      };

    case Actions.NEW_TRANSACTION_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {}
      };

    case Actions.RESET_NEW_TRANSACTION:
      return getDefaultState();

    default:
      return state;
  }
}
              //this is only for this file
export default new_transaction;
