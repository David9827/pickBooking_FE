import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// 🎨 Tạo theme hiện đại
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // xanh dương
        },
        secondary: {
            main: "#f50057", // hồng
        },
        background: {
            default: "#f4f6f8", // nền xám nhạt
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
