import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  if (page === "login") {
    return (
      <Login
        switchToRegister={() => setPage("register")}
        onLoginSuccess={() => setPage("dashboard")}
      />
    );
  }

  if (page === "register") {
    return <Register switchToLogin={() => setPage("login")} />;
  }

  return <Dashboard />;
}

export default App;
