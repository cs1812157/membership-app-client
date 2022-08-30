import Axios from "axios";
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
    USER_UPDATE_ACCOUNT_SUCCESS,
    USER_NEW_PASSWORD_REQUEST,
    USER_NEW_PASSWORD_SUCCESS,
    USER_NEW_PASSWORD_FAIL,
} from "../constants/UserConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userLoginAction = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post(`/api/users/login`, {
            email,
            password,
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        toast.success("Login Success");
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("Login failed");
    }
};

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem("userData");
    toast.success("Logged out");
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: USER_LOGOUT });
};

export const userRegisterAction =
    (name, email, password) => async (dispatch) => {
        dispatch({
            type: USER_REGISTER_REQUEST,
            payload: { name, email, password },
        });
        try {
            const { data } = await Axios.post(
                `/api/users/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem("userData", JSON.stringify(data));
            toast.success("Registration successfull");
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
            toast.error("Registration failed");
        }
    };

export const userUpdateAccountAction = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_ACCOUNT_REQUEST, payload: user });
    const {
        userLoginData: { userData },
    } = getState();
    try {
        const { data } = await Axios.put(
            `/api/users/update-account`,
            user,
            {
                headers: { Authorization: `Bearer ${userData.token}` },
            }
        );
        dispatch({ type: USER_UPDATE_ACCOUNT_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
        toast.success("Account update successfull");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: USER_UPDATE_ACCOUNT_FAIL, payload: message });
        toast.error("Account update failed");
    }
};

export const userResetPasswordAction = (email) => async (dispatch) => {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: email });
    try {
        const { data } = await Axios.post(
            `/api/users/reset-password`,
            { email }
        );
        dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
        toast.success("Reset password link sent");
    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("Reset password failed");
    }
};

export const userNewPasswordAction = (token, password) => async (dispatch) => {
    dispatch({ type: USER_NEW_PASSWORD_REQUEST, payload: token });
    try {
        const { data } = await Axios.post(
            `/api/users/new-password`,
            {
                token,
                password,
            }
        );
        dispatch({ type: USER_NEW_PASSWORD_SUCCESS, payload: data });
        toast.success("Password change success");
    } catch (error) {
        dispatch({
            type: USER_NEW_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("New password failed");
    }
};
