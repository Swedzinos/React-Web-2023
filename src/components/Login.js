import React, { useState } from "react";
import Axios from "axios";
import List from "./List.js";
import logoleft from "../images/logogood.png";
import logoright from "../images/anotherlogo.png";
import "../css/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoged, setIsLoged] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();

        Axios.post("http://localhost:3002/login", {
            username,
            password
        }).then((res) => {
            if(res.data.message) {
                setLoginError(res.data.message);
            }else {
                setIsLoged(true);
            }
        })
    }

    return (
        <>
            { isLoged ? (
                <List loggedAs={username}/>
            ) : (
                <section>
                    <div className="back">
                        <div className="backLeft"><img src={logoleft} className = "left-logo" alt="logo right" width="60%" height="50%"></img></div>
                    </div>

                    <div className="slideBox">
                        <div className="topLayer">
                            <div className="right">
                                <div className="content">
                                    <h3 className="err">{loginError}</h3>
                                    <h2>Zaloguj</h2>
                                    <form>
                                        <div className="form-element form-stack">
                                            <label htmlFor="username-login" className="form-label">Użytkownik</label>
                                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="nazwa użytkownika" />
                                        </div>
                                        <div className="form-element form-stack">
                                            <label htmlFor="password-login" className="form-label">Hasło</label>
                                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="hasło" />
                                        </div>
                                        <div className="form-element form-submit">
                                            <input type="submit" value="Zaloguj" name="login" className="login" onClick={loginHandler} />
                                        </div>
                                    </form>
                                    <div className="bottomLayer">
                                    <img src={logoright} className = "left-logo" alt="logo left" width="60%" height="50%"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Login;