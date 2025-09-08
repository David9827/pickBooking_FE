import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import { User } from "./types";

import { Routes, Route, Navigate  } from "react-router-dom";
import UserTable from "./components/UserTable";
import AdminSidebar from "./components/AdminSidebar";
import CourtManagement from "./components/CourtManagement";
import AdminDashboard from "./components/AdminDashboard";
import MyProfile from "./components/MyProfile";
import UserProfile from "./components/UserProfile";

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    if (!user) {
        return (
            <div style={{ background: "#f4f6f8", minHeight: "100vh", padding: "30px" }}>
                <Login onLogin={setUser} />
                <Register />
            </div>
        );
    }
    return (
        <Routes>
            {/* Trang chủ, truyền user & hàm logout */}
            <Route path="/" element={<HomePage user={user} onLogout={() => setUser(null)} />} />

            {/* admin page*/}
            <Route path="/admin" element={<AdminSidebar />} />
            {/* Trang quản lý users */}
            <Route path="/admin/users" element={<UserTable />} />
            {/* quản lý sân*/}
            <Route path="/admin/courts" element={<CourtManagement />} />
            {/* dashboard*/}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* myprofile*/}
            <Route path="/myprofile" element={<MyProfile userId={user.userId} />} />
            {/* Nếu vào đường dẫn khác → chuyển về Home */}
            <Route path="*" element={<Navigate to="/" />} />
            {/* truyền vào userPrf */}
            <Route path="/profile/:userId" element={<UserProfile />} />

        </Routes>
    );
   // return <HomePage user={user} onLogout={() => setUser(null)} />;

};

export default App;