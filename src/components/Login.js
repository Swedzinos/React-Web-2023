import React, { useState } from "react";
import Axios from "axios";
import List from "./List.js";

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
                    <h1>{loginError}</h1>
                    <h1>{isLoged ? "ZALOGOWANO JAKO " + username : "NIEZALOGOWANY"}</h1>
                    <form>
                        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="login" />
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                        <input type="submit" value="Login" onClick={loginHandler} />
                    </form>
                </section>
            )}
        </>
    );
}

export default Login;