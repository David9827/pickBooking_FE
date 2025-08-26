import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <AppBar
            position="sticky"
            sx={{
                background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ fontFamily: "Poppins, sans-serif", letterSpacing: 1 }}
                >
                    🎾 PickBooking
                </Typography>

                {/* Menu */}
                <div>
                    <Button color="inherit" component={Link} to="/" sx={{ fontWeight: "600" }}>
                        Trang chủ
                    </Button>
                    <Button color="inherit" component={Link} to="/profile" sx={{ fontWeight: "600" }}>
                        Cá nhân
                    </Button>
                    <Button color="inherit" component={Link} to="/admin" sx={{ fontWeight: "600" }}>
                        Admin
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
