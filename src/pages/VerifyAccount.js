import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userVerifyAccountAction } from "../redux/actions/UserActions";

const VerifyAccount = () => {
    let { registerToken } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (registerToken) {
            dispatch(userVerifyAccountAction(registerToken));
        }
    }, [dispatch, registerToken]);

    const { userData } = useSelector((state) => state.userLoginData);
    const { message, loading, error } = useSelector(
        (state) => state.userVerifyAccountData
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            navigate("/login");
        }
    }, [navigate, userData]);

    useEffect(() => {
        if (message) {
            navigate("/login");
        }
    }, [navigate, message]);

    return (
        <div className="verify">
            <div className="details">
                <div className="top">
                    <div className="info">
                        <span className="material-symbols-sharp">person</span>
                        <h2>Verify Account</h2>
                    </div>
                </div>
                <div className="status">
                    {loading ? (
                        <div>
                            <ClipLoader></ClipLoader>
                        </div>
                    ) : (
                        error && <span>{error}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
