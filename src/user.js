import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";

const User = () => {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState();
    const history = useHistory();

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to lougout");
            console.log("Failed to lougout");
        }
    }
    return (
        <div>
            <h2>WELCOME,{JSON.stringify(currentUser.email)}</h2>
            <h2>your name is {JSON.stringify(currentUser.displayName)}</h2>

            <button onClick={handleLogout}>Log Out</button>
            <Link to="/update-profile">Update Profile</Link>
        </div>
    )
}

export default User
