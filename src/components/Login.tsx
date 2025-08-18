import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { User } from "../types";

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                const user: User = await response.json();
                alert("Đăng nhập thành công!");
                onLogin(user);
            } else {
                alert("Sai username hoặc password!");
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi đăng nhập.");
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: "20px auto", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    🔑 Đăng nhập
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="password"
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "15px" }}
                    onClick={handleLogin}
                >
                    Đăng nhập
                </Button>
            </CardContent>
        </Card>
    );
};

export default Login;
