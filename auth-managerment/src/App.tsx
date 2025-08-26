import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";

import Navbar from "./components/Navbar";
import HomePage from "./user/pages/HomePage";
import ProfilePage from "./user/pages/ProfilePage";
import UserManagement from "./admin/pages/UserManagement";
import CourtManagement from "./admin/pages/CourtManagement";

const App: React.FC = () => {
    return (
        <Router>
            {/* Reset CSS mặc định */}
            <CssBaseline />

            {/* Navbar chung */}
            <Navbar />

            {/* Nội dung chính */}
            <Box sx={{ mt: 2 }}>
                <Routes>
                    {/* User routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Admin routes */}
                    <Route path="/admin" element={<UserManagement />} />
                    <Route path="/admin/courts" element={<CourtManagement />} />

                    {/* 404 fallback */}
                    <Route
                        path="*"
                        element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Trang không tồn tại</h2>}
                    />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
