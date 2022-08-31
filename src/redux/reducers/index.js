import { combineReducers } from "redux";
import {
    userLoginReducer,
    userResetPasswordReducer,
    userRegisterReducer,
    userUpdateAccountReducer,
    userNewPasswordReducer,
    userVerifyAccountReducer,
} from "./UserReducers";

export default combineReducers({
    userLoginData: userLoginReducer,
    userRegisterData: userRegisterReducer,
    userUpdateAccountData: userUpdateAccountReducer,
    userResetPasswordData: userResetPasswordReducer,
    userNewPasswordData: userNewPasswordReducer,
    userVerifyAccountData: userVerifyAccountReducer,
});
