import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterAction } from "../redux/actions/UserActions";

const Register = () => {
    const dispatch = useDispatch();

    const { userData: userDataRegister, loading, error } = useSelector(
        (state) => state.userRegisterData
    );
    const { userData } = useSelector((state) => state.userLoginData);

    const navigate = useNavigate();

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
                required: true,
        },
        {
            id: 3,
            label: "Email",
            labelFor: "email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Invalid email address",
            required: true,
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
            required: true,
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
            required: true,
            pattern: `${formValues.password}`,
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
        dispatch(
            userRegisterAction(
                formValues.name,
                formValues.email,
                formValues.password
            )
        );
    };

    useEffect(() => {
        if (userDataRegister || userData) {
            navigate("/dashboard");
        }
    }, [navigate, userDataRegister, userData]);

    return (
        <div className="sign">
            <div className="details">
                <div className="top">
                    <div className="info">
                        <span className="material-symbols-sharp">person</span>
                        <h2>Register</h2>
                    </div>
                    <div className="status danger">{error && <span>{error}</span>}</div>
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
                            <section>Already have an account? <Link to="/login">Login</Link></section>
                        </section>
                        <button type="submit" className="btn-primary">
                            {loading ? (
                                <ClipLoader color={"white"} size={35} />
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
