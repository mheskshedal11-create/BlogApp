import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    fullname: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsSignup(location.pathname === "/signup");
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isSignup
        ? "http://localhost:5000/api/user/register"
        : "http://localhost:5000/api/user/login";

      let response;

      if (isSignup) {
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        if (input.image) {
          formData.append("image", input.image);
        }

        response = await fetch(url, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Success:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("../user/Dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    navigate(isSignup ? "/login" : "/signup");
  };

  return (
    <div className="login-signup">
      <div className="login_signup_container">
        <h2>{isSignup ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          {isSignup && (
            <>
              <div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleForm}
            style={{
              border: "none",
              background: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;
