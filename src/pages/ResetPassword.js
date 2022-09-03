import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userResetPasswordAction } from "../redux/actions/UserActions";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userLoginData);
    const { message, loading, error } = useSelector(
        (state) => state.userResetPasswordData
    );

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
    ];
    const initialFormValues = { email: "" };
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
        dispatch(userResetPasswordAction(formValues.email));
    };

    useEffect(() => {
        if (userData) {
            navigate("/dashboard");
        }
    }, [navigate, userData]);
    useEffect(() => {
        if (message) {
            navigate("/login");
        }
    }, [navigate, message]);

    return (
        <div className="sign">
            <div className="details">
                <div className="top">
                    <div className="info">
                        <span className="material-symbols-sharp">person</span>
                        <h2>Reset Password</h2>
                    </div>
                    <div
                        className={
                            error
                                ? "status danger"
                                : message
                                ? "status success"
                                : ""
                        }
                    >
                        {error && <span>{error}</span>}
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
                        <button type="submit" className="btn-primary btn-form">
                            {loading ? (
                                <ClipLoader color={"white"} size={35} />
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
