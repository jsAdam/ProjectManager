import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function onSubmit(e) {
        e.preventDefault();
        
        await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        .then((response) => {
            console.log(response.json());
        }).then((data) => {
            console.log(data);
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        
        //navigate("/home");
    }

    return (
        <div className="col-md-3 p-4 bg-white rounded">
            <h3 className="pb-3">Login</h3>
            <form>
                <div className="form-group pb-4">
                    <label className="pb-2">Username</label>
                    <input 
                        type="text"
                        className="form-control bg-light"
                        id="name"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group pb-4">
                    <label className="pb-2">Password</label>
                    <input 
                        type="text"
                        className="form-control bg-light"
                        id="name"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        value="Login"
                        className="btn btn-primary w-100"
                    />
                </div>
                <div className="text-center pt-4">
                    <p className="m-0">Don't have an account? <a href="/createUser" className="text-dark font-weight-bold">Sign Up</a></p>
                </div> 
            </form>
        </div>
    )
}