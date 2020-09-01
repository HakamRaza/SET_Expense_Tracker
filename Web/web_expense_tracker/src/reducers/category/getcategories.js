import Actions from "../../actions";

const getDefaultState = () => ({ isLoading: false, error: null, data: {} });

function get_categories(state, action) {
  if (typeof state === "undefined") {
    return getDefaultState();
  }

  switch (action.type) {
        //same as in action type
    case Actions.GET_CATEGORIES:
      return {
        isLoading: true,
        error: null,
        data: {}
      };

    case Actions.GET_CATEGORIES_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data
      };

    case Actions.GET_CATEGORIES_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: {}
      };

    case Actions.RESET_GET_CATEGORIES:
      return getDefaultState();

    default:
      return state;
  }
}
              //this is only for this file
export default get_categories;
