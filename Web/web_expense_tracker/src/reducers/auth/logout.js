import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function logout(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.LOGOUT:
      return {
        isLoading: true,
        error: null,
        data: {}
      };

    case Actions.LOGOUT_SUCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data
      };

    case Actions.LOGOUT_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {}
      };

    case Actions.RESET_LOGOUT:
      return getDefaultState();

    default:
      return state;
  }
}

export default logout;
