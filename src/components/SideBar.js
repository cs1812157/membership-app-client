import React from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/UserActions";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
    const dispatch = useDispatch();
    let location = useLocation();

    const handleCloseMenu = () => {
        const sideMenu = document.querySelector("aside");
        sideMenu.style.display = "none";
    };
    const handleShowMenu = () => {
        const sideMenu = document.querySelector("aside");
        sideMenu.style.display = "block";
    };

    const logoutHandler = () => {
        dispatch(logoutAction());
    };

    const buttons = [
        { name: "Dashboard", link: "dashboard", iconName: "dashboard" },
        { name: "Account", link: "account", iconName: "person" },
    ];
    return (
        <div>
            <div className="open" id="open-btn" onClick={handleShowMenu}>
                <span className="material-symbols-sharp">menu</span>
            </div>
            <aside>
                <div className="top">
                    <div
                        className="close"
                        id="close-btn"
                        onClick={handleCloseMenu}
                    >
                        <span className="material-symbols-sharp">close</span>
                    </div>
                </div>
                <div className="sidebar">
                    {buttons.map((button, index) => (
                        <Link
                            key={index}
                            to={`/${button.link}`}
                            className={
                                location.pathname === `/${button.link}`
                                    ? "active"
                                    : ""
                            }
                        >
                            <span className="material-symbols-sharp">
                                {button.iconName}
                            </span>
                            <h3>{button.name}</h3>
                        </Link>
                    ))}
                    <Link to="/" onClick={logoutHandler}>
                        <span className="material-symbols-sharp">logout</span>
                        <h3>Logout</h3>
                    </Link>{" "}
                </div>
            </aside>
        </div>
    );
};

export default SideBar;
