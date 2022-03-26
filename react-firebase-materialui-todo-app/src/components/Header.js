import React, {useContext, useEffect, useState} from "react";
import {NavLink as Link, useLocation, useHistory} from "react-router-dom";
import "./Header.css";
import {logoutUser} from "../pages/Login";
import {UserContext} from "../App";



const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const user = useContext(UserContext)
    const [search, setSearch] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?name=${search}`);
        setSearch("");
    };

    return (
        <div className="header">
            <p className="logo">WebTracking System</p>
            <h1>
                <span className="text-primary">{user?.email} </span>{" "}
            </h1>
            <div className="header-right">
                <form onSubmit={handleSubmit} style={{display: "inline"}}>
                    <input
                        type="number"
                        className="inputField"
                        placeholder="Wyszukaj"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </form>
                <Link to="/">
                    <p
                        className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setActiveTab("Home")}
                    >
                        Home
                    </p>
                </Link>
                <Link to="/add">
                    <p
                        className={`${activeTab === "AddIP" ? "active" : ""}`}
                        onClick={() => setActiveTab("AddIP")}
                    >
                        Dodaj Adres IP
                    </p>
                </Link>
                <Link to="/about">
                    <p
                        className={`${activeTab === "About" ? "active" : ""}`}
                        onClick={() => setActiveTab("About")}
                    >
                        O nas
                    </p>
                </Link>
                <Link to="/Login">
                    <p
                        type="button"
                        className="logoutUser"
                        onClick={logoutUser}
                    >
                        Wyloguj
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Header;
