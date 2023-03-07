import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateUser() {
    const [createUser, setCreateUser] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [retypedPassword, setRetypedPassword] = React.useState("");

    async function onSubmit(e) {
        e.preventDefault();
        
        await fetch("http://localhost:5000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, username, password}),
        })
        .then(data => {
            console.log("User Created");
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
            <h3 className="pb-3">Create User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group pb-4">
                    <label className="pb-2">Email</label>
                    <input 
                        type="text"
                        className="form-control bg-light"
                        id="name"
                        value={email}
                        placeholder="example@yahoo.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
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
                        type="password"
                        className="form-control bg-light"
                        id="name"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group pb-4">
                    <label className="pb-2">Retype Password</label>
                    <input 
                        type="password"
                        className="form-control bg-light"
                        id="name"
                        value={retypedPassword}
                        placeholder="Retype password"
                        onChange={(e) => setRetypedPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        value="Create User"
                        className="btn btn-primary w-100"
                    />
                </div>
                <div className="text-center pt-4">
                    <p className="m-0">Click here to <a href="/login" className="text-dark font-weight-bold">Login</a></p>
                </div> 
            </form>
        </div>
    )
}