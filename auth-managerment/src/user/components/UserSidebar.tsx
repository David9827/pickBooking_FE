import React from "react";
import Sidebar from "../../components/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import PersonIcon from "@mui/icons-material/Person";

const UserSidebar: React.FC = () => {
    const menuItems = [
        { label: "Bảng tin", icon: <HomeIcon />, path: "/" },
        { label: "Đặt sân", icon: <SportsTennisIcon />, path: "/booking" },
        { label: "Thông tin cá nhân", icon: <PersonIcon />, path: "/profile" },
    ];

    return <Sidebar items={menuItems} />;
};

export default UserSidebar;
