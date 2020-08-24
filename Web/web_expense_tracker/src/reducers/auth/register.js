// import from src auth folder action 
import Actions from "../../actions";

//to set inital state, to cheack when funtion below are executed
const getDefaultState = () => ({
    isLoading: false,
    error:null,
    data:{},
})

//create pure function
function register(state, action){

    // reset state to initial default state
    if (typeof state === "undefined"){
        return getDefaultState();
    }

    // if the action.type === login then ?
    // if the sucess.type === login then ?
    //using switch case

    switch (action.type) {
        case Actions.REGISTER:
            return {
                // is it loading?, to check state current is done or not
                isLoading: true,
                // any error
                error: null,
                // give data ?
                data: {},
            };

        // break; using return already break the case
    
        case Actions.REGISTER_SUCESS:
            return {
                isLoading: false,
                error: null,
                data: action.data,
            };
        
        case Actions.REGISTER_FAIL:
            return {
                isLoading: false,
                error: action.error,
                data: {},
            };

        default:
            return state;
        break;
    }
}

export default register;