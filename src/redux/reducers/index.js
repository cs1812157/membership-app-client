import { combineReducers } from "redux";
import {
    userLoginReducer,
    userResetPasswordReducer,
    userRegisterReducer,
    userUpdateAccountReducer,
    userNewPasswordReducer,
    userVerifyAccountReducer,
    userUploadProfilePictureReducer,
    userVerifyLoginReducer,
} from "./UserReducers";

export default combineReducers({
    userLoginData: userLoginReducer,
    userVerifyLoginData: userVerifyLoginReducer,
    userRegisterData: userRegisterReducer,
    userUpdateAccountData: userUpdateAccountReducer,
    userResetPasswordData: userResetPasswordReducer,
    userNewPasswordData: userNewPasswordReducer,
    userVerifyAccountData: userVerifyAccountReducer,
    userUploadProfilePictureData: userUploadProfilePictureReducer,
});
