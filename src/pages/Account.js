import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import Wrapper from "../components/Wrapper";
import { baseurl2 } from "../config/config";
import {
    userUpdateAccountAction,
    userUpdateProfilePictureAction,
} from "../redux/actions/UserActions";

const Account = () => {
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.userLoginData);
    const { loading, error } = useSelector(
        (state) => state.userUpdateAccountData
    );
    const { image } = useSelector((state) => state.userUploadProfilePictureData);

    const initialFormValues = {
        image: "",
        name: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
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
            id: 2,
            label: "Email",
            labelFor: "email",
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            errorMessage: "Invalid email address",
        },
        {
            id: 3,
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
            id: 4,
            label: "Confirm Password",
            labelFor: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm your password",
            errorMessage: "Password and confirm password should be same",
            pattern: `${formValues.newPassword}`,
            required: formValues.newPassword.length >= 1 ? true : false,
        },
        {
            id: 5,
            label: "Current Password",
            labelFor: "currentPassword",
            name: "currentPassword",
            type: "password",
            placeholder: "Enter your current password",
            errorMessage:
                "Password should be between 8-20 characters and must contain at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    useEffect(() => {
        if (userData) {
            setFormValues({
                ...formValues,
                image: userData.image,
                name: userData.name,
                email: userData.email,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    useEffect(() => {
        if (image) {
            setFormValues({ ...formValues, image: image });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    const [focused, setFocused] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleProfilePicture = (e) => {
        const file = e.target.files[0];
        if (file.size > 200 * 1024) {
            alert("File size should be less than 200 kb");
        } else {
            dispatch(userUpdateProfilePictureAction(file));
        }
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
                image: formValues.image,
                name: formValues.name,
                email: formValues.email,
                newPassword: formValues.newPassword,
                currentPassword: formValues.currentPassword,
            })
        );
        setFocused([]);
        setFormValues({
            ...formValues,
            newPassword: "",
            confirmPassword: "",
            currentPassword: "",
        });
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
                            <div className="wrapper-profilePicture">
                                <img
                                    src={
                                        formValues.image
                                            ? baseurl2 + formValues.image
                                            : `${baseurl2}/uploads/empty.jpg`
                                    }
                                    alt="img"
                                ></img>
                                <input
                                    type="file"
                                    className="input-profilePicture"
                                    id="profilePicture"
                                    name="profilePicture"
                                    onChange={handleProfilePicture}
                                    restrictions={{
                                        maxFileSize: 10,
                                    }}
                                ></input>
                            </div>
                            {/* <div>
                                <label htmlFor="profilePicture">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    name="profilePicture"
                                    onChange={handleProfilePicture}
                                    restrictions={{
                                        maxFileSize: 10,
                                    }}
                                ></input>
                            </div> */}
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
                            <button
                                type="submit"
                                className="btn-primary btn-form"
                            >
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
        </Wrapper>
    );
};

export default Account;
