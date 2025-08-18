import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import { User } from "./types";

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

    return <HomePage user={user} onLogout={() => setUser(null)} />;
};

export default App;