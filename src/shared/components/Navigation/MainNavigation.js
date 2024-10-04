import React from "react";
import { Link } from "react-router-dom";
import "./MainHeader";
import "./MainNavigation.css"
import MainHeader from "./MainHeader";

function MainNavigation(props){
    return (
        <MainHeader className ="main-navigation__header-nav">
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
                </button>
                <h1 className="main-navigation__title">
                <Link to="/">YourPlaces  </Link>
                </h1>
                <nav>
                    ...
                </nav>
        </MainHeader>)
}

export default MainNavigation;