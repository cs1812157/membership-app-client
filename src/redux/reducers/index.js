import { combineReducers } from "redux";
import { userLoginReducer, userResetPasswordReducer, userRegisterReducer, userUpdateAccountReducer } from "./UserReducers";

export default combineReducers({
    userLoginData: userLoginReducer,
    userRegisterData: userRegisterReducer,
    userUpdateAccountData: userUpdateAccountReducer,
    userResetPasswordData: userResetPasswordReducer
});
