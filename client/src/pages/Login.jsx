import { useState } from "react";
import api from "../api/api";
import socket from "../socket/socket";

function Login({ switchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      socket.connect();
      alert("Welcome back");
      onLoginSuccess(); // 👉 GO TO DASHBOARD
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">

          <div className="signin-image">
            <figure>
              <img src="/assets/images/signin-image.jpg" alt="sign in" />
            </figure>
            <a onClick={switchToRegister} className="signup-image-link">
              Create an account
            </a>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>

            <form className="register-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label><i className="zmdi zmdi-email"></i></label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="form-group form-button">
                <input type="submit" className="form-submit" value="Log in" />
              </div>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;
