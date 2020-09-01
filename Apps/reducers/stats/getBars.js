import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function getBars(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.GET_BARS:
      return {
        isLoading: true,
        error: null,
        data: {},
      };

    case Actions.GET_BARS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };

    case Actions.GET_BARS_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {},
      };

    default:
      return state;
  }
}

export default getBars;
