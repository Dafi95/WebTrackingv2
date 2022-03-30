import React, {useState} from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import auth from "../auth/config";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim";
import "../styles.css";
// import fireDb from "../firebase";
// import {Link} from "react-router-dom";
// import Home from "./Home";
import "./Home.css";
// import {Redirect} from "react-router-dom";
// import PrivateRoute from "../PrivateRoute";
// import { toast } from "react-toastify";
// import authen from "./authen";


console.log(auth)

export const logoutUser = () => {
    auth
        .signOut()
        .then((user) => {
            if (user) {

            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const Login = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [setUser] = useState({});
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");


    const createUser = (email, pass) => {
        auth
            .createUserWithEmailAndPassword(email, pass)
            .then((user) => {
                setSuccess("User is successfully registered");
                setErr("");
            })
            .catch((err) => {
                setErr("something went wrong");
                setSuccess("");
            });
    };

    const loginUser = (email, pass) => {
        auth
            .signInWithEmailAndPassword(email, pass)
            .then((user) => {
                console.log("z logowania")
                setAuthenticated(true);
                setUser(user);
                setSuccess("You are successfully logged in");
                setErr("");
            })
            .catch((err) => {
                setErr("Invalid Email or Password");
                setSuccess("");
            });
    };


    const errorSetting = (error) => {
        setErr(error);
    };

    return (
        <div className="container">
            {err !== "" ? (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                    style={{
                        position: "absolute",
                        zIndex: "999",
                        right: "5%",
                        top: "60%"
                    }}
                >
                    <strong>{err}</strong>
                </div>
            ) : null}
            {success !== "" ? (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                    style={{
                        position: "absolute",
                        zIndex: "999",
                        right: "5%",
                        top: "60%"
                    }}
                >
                    <strong>{success}</strong>
                </div>
            ) : null}
            <div className="row">
                <div className="iptable">
                    Witaj na stronie WebTracking, opiera się na React i Firebase
                </div>

                {!authenticated ? (
                    <>
                        <LoginForm loginUser={loginUser} errorSetting={errorSetting}/>
                        <RegisterForm createUser={createUser} errorSetting={errorSetting}/>
                    </>
                ) : (
                    <button
                    onClick={event => window.location.href='/'
                    }
                    >
                        Show me App
                    </button>

                )}
            </div>
        </div>
    );
};



export default Login;

