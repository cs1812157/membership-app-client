import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../redux/actions/UserActions";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import {
    USER_LOGOUT,
    USER_NEW_PASSWORD_RESET,
    USER_REGISTER_RESET,
    USER_RESET_PASSWORD_RESET,
    USER_VERIFY_ACCOUNT_RESET,
} from "../redux/constants/UserConstants";

const Login = () => {
    const dispatch = useDispatch();

    const { userData, loading, error } = useSelector(
        (state) => state.userLoginData
    );
    const { message: messageRegister } = useSelector(
        (state) => state.userRegisterData
    );
    const { message: messageResetPassword } = useSelector(
        (state) => state.userResetPasswordData
    );
    const { message: messageNewPassword } = useSelector(
        (state) => state.userNewPasswordData
    );
    const { message: messageVerifyAccount } = useSelector(
        (state) => state.userVerifyAccountData
    );
    const [messages, setMessages] = useState({
        register: "",
        resetPassword: "",
        newPassword: "",
        verifyAccount: "",
    });
    useEffect(() => {
        if (messageRegister) {
            setMessages({ ...messages, register: messageRegister });
            dispatch({ type: USER_REGISTER_RESET });
        }
        if (messageResetPassword) {
            setMessages({ ...messages, resetPassword: messageResetPassword });
            dispatch({ type: USER_RESET_PASSWORD_RESET });
        }
        if (messageNewPassword) {
            setMessages({ ...messages, newPassword: messageNewPassword });
            dispatch({ type: USER_NEW_PASSWORD_RESET });
        }
        if (messageVerifyAccount) {
            setMessages({ ...messages, verifyAccount: messageVerifyAccount });
            dispatch({ type: USER_VERIFY_ACCOUNT_RESET });
        }
    }, [
        messages,
        messageRegister,
        messageResetPassword,
        messageNewPassword,
        messageVerifyAccount,
        dispatch,
    ]);

    const navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            label: "Email",
            labelFor: "email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Invalid email address",
            required: true,
        },
        {
            id: 2,
            label: "Password",
            labelFor: "password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            errorMessage:
                "Password should be between 8-20 characters and must contain at least 1 letter, 1 number and 1 special character",
            required: true,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        },
    ];
    const initialFormValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [focused, setFocused] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFocus = (e) => {
        const { id, value } = e.target;
        if (!focused.includes(id) && value.length >= 1) {
            setFocused([...focused, id]);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setMessages(undefined);
        dispatch(userLoginAction(formValues.email, formValues.password));
        setFocused([]);
        setFormValues({
            ...formValues,
            password: "",
            confirmPassword: "",
        });
    };

    useEffect(() => {
        if (userData) {
            navigate("/dashboard");
        } else {
            // TODO: Remove them if they're not useful
            localStorage.removeItem("userData");
            dispatch({ type: USER_LOGOUT });
        }
    }, [navigate, userData, dispatch]);

    return (
        <div className="sign">
            <div className="details">
                <div className="top">
                    <div className="info">
                        <span className="material-symbols-sharp">person</span>
                        <h2>Login</h2>
                    </div>
                    <div className="status danger">
                        {error && <span>{error}</span>}
                    </div>
                    <div className="status success">
                        {messages?.register && (
                            <span>{messages?.register}</span>
                        )}
                    </div>
                    <div className="status success">
                        {messages?.resetPassword && (
                            <span>{messages?.resetPassword}</span>
                        )}
                    </div>
                    <div className="status success">
                        {messages?.newPassword && (
                            <span>{messages?.newPassword}</span>
                        )}
                    </div>
                    <div className="status success">
                        {messages?.verifyAccount && (
                            <span>{messages?.verifyAccount}</span>
                        )}
                    </div>
                </div>
                <div>
                    <form onSubmit={submitHandler}>
                        {inputs.map((input) => (
                            <div key={input.id}>
                                <label htmlFor={input.labelFor}>
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    id={input.id}
                                    name={input.name}
                                    onChange={handleChange}
                                    value={formValues[input.name]}
                                    required={input.required}
                                    pattern={input.pattern}
                                    focused={
                                        focused.includes(input.id.toString())
                                            ? "true"
                                            : "false"
                                    }
                                    onBlur={handleFocus}
                                ></input>
                                <span>{input.errorMessage}</span>
                            </div>
                        ))}
                        <section className="links">
                            <section>
                                Don't have an account yet?{" "}
                                <Link to="/register">Register</Link>
                            </section>
                            <section>
                                Forgot your password?{" "}
                                <Link to="/reset-password">Reset Password</Link>
                            </section>
                        </section>
                        <button type="submit" className="btn-primary btn-form">
                            {loading ? (
                                <ClipLoader color={"white"} size={35} />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
