import { combineReducers } from "redux";
import {
    userLoginReducer,
    userResetPasswordReducer,
    userRegisterReducer,
    userUpdateAccountReducer,
    userNewPasswordReducer,
    userVerifyAccountReducer,
    userUploadProfilePictureReducer,
} from "./UserReducers";

export default combineReducers({
    userLoginData: userLoginReducer,
    userRegisterData: userRegisterReducer,
    userUpdateAccountData: userUpdateAccountReducer,
    userResetPasswordData: userResetPasswordReducer,
    userNewPasswordData: userNewPasswordReducer,
    userVerifyAccountData: userVerifyAccountReducer,
    userUploadProfilePictureData: userUploadProfilePictureReducer,
});
