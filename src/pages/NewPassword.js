import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { userNewPasswordAction } from "../redux/actions/UserActions";
import { useParams } from "react-router-dom";

const NewPassword = () => {
    let { token } = useParams();

    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userLoginData);
    const { message, loading, error } = useSelector(
        (state) => state.userResetPasswordData
    );

    const navigate = useNavigate();

    const initialFormValues = { newPassword: "", confirmNewPassword: "" };
    const [formValues, setFormValues] = useState(initialFormValues);

    const inputs = [
        {
            id: 1,
            label: "New Password",
            labelFor: "newPassword",
            name: "newPassword",
            type: "password",
            placeholder: "Enter your new password",
            errorMessage:
                "Password should be between 8-20 characters and must contain at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        },
        {
            id: 2,
            label: "Confirm New Password",
            labelFor: "confirmNewPassword",
            name: "confirmNewPassword",
            type: "password",
            placeholder: "Confirm your new password",
            errorMessage: "Password and confirm password should be same",
            pattern: `${formValues?.newPassword}`,
            required: formValues?.newPassword.length >= 1 ? true : false,
        },
    ];

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
        dispatch(userNewPasswordAction(token, formValues.newPassword));
    };

    useEffect(() => {
        if (userData) {
            navigate("/login");
        }
    }, [navigate, userData]);

    return (
        <div className="sign">
            <div className="details">
                <div className="top">
                    <div className="info">
                        <span className="material-symbols-sharp">person</span>
                        <h2>New Password</h2>
                    </div>
                    <div className={error ? "danger" : message ? "success" : ""}>
                        {error && <span>{error}</span>}
                        {message && <span>{message}</span>}
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
                        <button type="submit" className="btn-primary">
                            {loading ? (
                                <ClipLoader color={"white"} size={35} />
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
