import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";

const Register: React.FC = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                alert("Đăng ký thành công!");
                setForm({ username: "", password: "", email: "", fullName: "", phone: "" });
            } else {
                const msg = await response.text();
                alert("Lỗi: " + msg);
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi đăng ký.");
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: "20px auto", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    📝 Đăng ký
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Họ tên"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "15px" }}
                    onClick={handleRegister}
                >
                    Đăng ký
                </Button>
            </CardContent>
        </Card>
    );
};

export default Register;
