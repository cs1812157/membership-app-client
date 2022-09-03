import React from "react";
import SideBar from "./SideBar";

export default function Wrapper(props) {
    return (
        <div className="container">
            <SideBar></SideBar>
            <div id="content">{props.children}</div>
        </div>
    );
}
