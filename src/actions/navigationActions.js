import { NAVIGATE_TO_PROFILE } from "./actiontypes.js"

export const navigateToProfile=(userID)=>({
    type:NAVIGATE_TO_PROFILE,
    payload:userID,
})