import { SET_USER } from "./actiontypes.js"

// Action creator to set the user in the state
export const setUser=(user)=>({
type:SET_USER,
payload:user

})