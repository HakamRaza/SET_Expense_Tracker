import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function newCategory(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.NEW_CATEGORY:
      return {
        isLoading: true,
        error: null,
        data: {},
      };

    case Actions.NEW_CATEGORY_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.NEW_CATEGORY_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
}

export default newCategory;