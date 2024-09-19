import {SET_USER} from "../actions/actiontypes.js"

const initialState={
    user:null,
}
// managing user states changes
const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case SET_USER:
            return{
                ...state,
                user:action.payload
            }
    
        default:
            return state
    }
}
export default userReducer