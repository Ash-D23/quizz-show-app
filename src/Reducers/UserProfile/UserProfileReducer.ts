import { userType } from "../../types/AuthContext.types"
import { UserProfileActions } from "../../types/UserProfileReducer.types"
import { USER_PROFILE_ACTIONS } from "../../Utilities"

export const userProfileReducerFn = (state : userType, action : UserProfileActions) =>{
    switch(action.type){
        case USER_PROFILE_ACTIONS.UPDATE_USER_NAME :
            return { ...state, userName: action.payload }
        case USER_PROFILE_ACTIONS.UPDATE_FIRST_NAME :
            return { ...state, firstName: action.payload }
        case USER_PROFILE_ACTIONS.UPDATE_LAST_NAME :
            return { ...state, lastName: action.payload }
        case USER_PROFILE_ACTIONS.UPDATE_PHONE :
            return { ...state, phone: action.payload }
        case USER_PROFILE_ACTIONS.UPDATE_GENDER :
            return { ...state, gender: action.payload }
        case USER_PROFILE_ACTIONS.RESET_PROFILE:
            return { ...action.payload }
        default:
            return state
    }
}