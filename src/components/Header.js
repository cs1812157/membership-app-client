import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const { userData } = useSelector((state) => state.userLoginData);
    return (
        <div className="header">
            <div>
                <h1>
                    Funland <span className="danger">Prizes</span>
                </h1>
            </div>
            {!userData && (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">
                        <button className="btn-primary">Get Started</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
