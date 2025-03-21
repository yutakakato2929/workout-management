import React from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "./api";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthToken(null);
        navigate("/");
    };

    return (
        <div>
            <h2>ホームページ</h2>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
};

export default Home;