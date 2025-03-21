import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "./api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post("login/", { email, password });
            const { access } = response.data;

            // JWT を保存 & 設定
            setAuthToken(access);

            // ログイン成功後、メインページへリダイレクト
            navigate("/home");
        } catch (e) {
            setError("ログインに失敗しました。" + e);
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default Login;