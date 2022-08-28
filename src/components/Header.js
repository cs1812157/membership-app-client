import React from "react";
import logo from "../logo.svg";

export default function Header() {
    return (
        <div className="header">
            <div>
                <h1>
                    Funland <span className="danger">Prizes</span>
                </h1>
            </div>
            <div>
                <img src={logo} alt="funlandprizes"></img>
            </div>
        </div>
    );
}
