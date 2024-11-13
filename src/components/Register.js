import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      setError(error.response?.data.message || "Registration failed");
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const bubbleStyle = (size, top, left) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: "rgba(30, 144, 255, 0.3)",
    top,
    left,
  });

  const bubbles = [
    { size: "150px", top: "10%", left: "10%" },
    { size: "120px", top: "50%", left: "5%" },
    { size: "100px", top: "20%", right: "15%" },
    { size: "90px", top: "75%", right: "20%" },
    { size: "110px", top: "30%", left: "40%" },
    { size: "140px", top: "15%", left: "25%" },
  ];

  return (
    <section
      className="hero is-fullheight is-fullwidth"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          style={bubbleStyle(
            bubble.size,
            bubble.top,
            bubble.left || bubble.right
          )}
        ></div>
      ))}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form className="box" onSubmit={handleSubmit}>
                {error && <div className="notification is-danger">{error}</div>}
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
                      className="input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirm your password"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-primary is-fullwidth"
                    style={{ backgroundColor: "blue", color: "white" }}
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className="has-text-centered mt-4">
                  <p>
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
