import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function delete_category(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.DELETE_CATEGORY:
      return {
        isLoading: true,
        error: null,
        data: {},
      };

    case Actions.DELETE_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.DELETE_CATEGORY_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
}

export default delete_category;