import React, { useState } from "react";
import supabase from "../helper/supabaseClient"; // adjust path
import  "./LoginForm.css"

export function LoginForm({ onLogin, className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else onLogin(data.session);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({provider: "github"})
  };

  const handleForgotPassword = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173",
  });

  if (error) alert(error.message);
  else alert("Check your email for a password reset link.");
};

  return (
  <div className={`login-container ${className || ""}`}>
    <div className="login-card">
      <h2 className="login-title">Welcome back</h2>
      <p className="login-subtitle">Login with your Apple or Google account</p>

      <div className="social-buttons">
        <button onClick={handleGithubLogin} className="social-btn">Login with Github</button>
        <button type="button" onClick={handleGoogleLogin} className="social-btn">Login with Google</button>
      </div>
      <div className="divider">
        <span>Or continue with</span>
        <hr />
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <div className="label-row">
            <label htmlFor="password">Password</label>
            <a type="button" onClick={handleForgotPassword} href="#">Forgot your password?</a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>

    <p className="footer-text">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </p>
  </div>
);

}
