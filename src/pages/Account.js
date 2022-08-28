import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import Wrapper from "../components/Wrapper";
import { userUpdateAccountAction } from "../redux/actions/UserActions";

const Account = () => {
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userLoginData);
    const { loading, error } = useSelector(
        (state) => state.userUpdateAccountData
    );

    const initialFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [formValues, setFormValues] = useState(initialFormValues);

    const inputs = [
        {
            id: 1,
            label: "Name",
            labelFor: "name",
            name: "name",
            type: "text",
            placeholder: "Enter your full name",
            errorMessage:
                "Full name should be between 3-50 characters and alphabets only",
            pattern: "^[a-zA-z]+([\\s][a-zA-Z]+)*$",
        },
        {
            id: 3,
            label: "Email",
            labelFor: "email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Invalid email address",
        },
        {
            id: 4,
            label: "Password",
            labelFor: "password",
            name: "password",
            type: "password",
            placeholder: "Enter your password",
            errorMessage:
                "Password should be between 8-20 characters and must contain at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        },
        {
            id: 5,
            label: "Confirm Password",
            labelFor: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm your password",
            errorMessage: "Password and confirm password should be same",
            pattern: `${formValues.password}`,
            required: formValues.password.length >= 1 ? true : false,
        },
    ];

    useEffect(() => {
        if (userData) {
            setFormValues({
                ...formValues,
                name: userData.name,
                email: userData.email,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

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
        dispatch(
            userUpdateAccountAction({
                userID: userData._id,
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
            })
        );
    };
    return (
        <Wrapper>
            <div className="account">
                <h1>Account</h1>
                <div className="details">
                    <div className="top">
                        <div className="info">
                            <span className="material-symbols-sharp">
                                person
                            </span>
                            <h2>Account</h2>
                        </div>
                        <div className="status danger">
                            {error && <span>{error}</span>}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={submitHandler}>
                            {inputs.map((input) => (
                                <div key={input.id}>
                                    <label htmlFor={input.labelFor}>
                                        {input.required && "*"} {input.label}
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
                                            focused.includes(
                                                input.id.toString()
                                            )
                                                ? "true"
                                                : "false"
                                        }
                                        onBlur={handleFocus}
                                    ></input>
                                    <span>{input.errorMessage}</span>
                                </div>
                            ))}
                            <button type="submit" className="btn-primary">
                                {loading ? (
                                    <ClipLoader color={"white"} size={35} />
                                ) : (
                                    "Update Account"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" className="toastify" />
        </Wrapper>
    );
};

export default Account;
