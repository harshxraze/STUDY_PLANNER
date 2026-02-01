import { useState } from "react";
import api from "../api/api";

function Register({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful");
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">

          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>

            <form className="register-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
              </div>

              <div className="form-group">
                <label><i className="zmdi zmdi-email"></i></label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" />
              </div>

              <div className="form-group">
                <label><i className="zmdi zmdi-lock"></i></label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
              </div>

              <div className="form-group">
                <label><i className="zmdi zmdi-lock-outline"></i></label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" />
              </div>

              <div className="form-group form-button">
                <input type="submit" className="form-submit" value="Register" />
              </div>
            </form>
          </div>

          <div className="signup-image">
            <figure>
              <img src="/assets/images/signup-image.jpg" alt="sign up" />
            </figure>
            <a onClick={switchToLogin} className="signup-image-link">
              I am already member
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Register;
