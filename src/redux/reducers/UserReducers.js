import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_RESET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESET,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_ACCOUNT_FAIL,
    USER_UPDATE_ACCOUNT_REQUEST,
    USER_UPDATE_ACCOUNT_RESET,
    USER_UPDATE_ACCOUNT_SUCCESS,
    USER_RESET_PASSWORD_RESET,
    USER_NEW_PASSWORD_REQUEST,
    USER_NEW_PASSWORD_SUCCESS,
    USER_NEW_PASSWORD_FAIL,
    USER_NEW_PASSWORD_RESET,
    USER_VERIFY_ACCOUNT_RESET,
    USER_VERIFY_ACCOUNT_FAIL,
    USER_VERIFY_ACCOUNT_SUCCESS,
    USER_VERIFY_ACCOUNT_REQUEST,
} from "../constants/UserConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userData: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, message: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_ACCOUNT_REQUEST:
            return { loading: true };
        case USER_UPDATE_ACCOUNT_SUCCESS:
            return { loading: false, userData: action.payload };
        case USER_UPDATE_ACCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_ACCOUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const userResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true };
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload };
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_RESET_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

export const userNewPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_NEW_PASSWORD_REQUEST:
            return { loading: true };
        case USER_NEW_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload };
        case USER_NEW_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_NEW_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

export const userVerifyAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_VERIFY_ACCOUNT_REQUEST:
            return { loading: true };
        case USER_VERIFY_ACCOUNT_SUCCESS:
            return { loading: false, message: action.payload };
        case USER_VERIFY_ACCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case USER_VERIFY_ACCOUNT_RESET:
            return {};
        default:
            return state;
    }
};
