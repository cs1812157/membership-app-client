import { combineReducers } from "redux";
import {
    userLoginReducer,
    userResetPasswordReducer,
    userRegisterReducer,
    userUpdateAccountReducer,
    userNewPasswordReducer,
    userVerifyAccountReducer,
    userUploadProfilePictureReducer,
    userUpdatedLoginReducer,
} from "./UserReducers";

export default combineReducers({
    userLoginData: userLoginReducer,
    userUpdatedLoginData: userUpdatedLoginReducer,
    userRegisterData: userRegisterReducer,
    userUpdateAccountData: userUpdateAccountReducer,
    userResetPasswordData: userResetPasswordReducer,
    userNewPasswordData: userNewPasswordReducer,
    userVerifyAccountData: userVerifyAccountReducer,
    userUploadProfilePictureData: userUploadProfilePictureReducer,
});
