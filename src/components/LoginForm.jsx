import React, { useState } from "react";
import supabase from "../helper/supabaseClient"; // adjust path
import  "./LoginForm.css"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export function LoginForm({ onLogin, className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else onLogin(data.session);
  };

  const handleSignUp = async() => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) alert(error.message)
    else alert("Account created! Check your email for confirmation.")
  }
  
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
      <p className="login-subtitle">Login with your Github or Google account</p>

      <div className="social-buttons">
        <button
          onClick={handleGithubLogin}
          className="button">
          <i className="btnlogo">
            <FaGithub size={20} />
          </i>
          <span className="btntext">
            Login with Github
          </span>
        </button>
        <button
        type="button"
        onClick={handleGoogleLogin}
        className="button"
        ><span className="btnlogo">
          <FcGoogle size={21.5} />
        </span>
        <span className="btntext">Login with Google</span>
        </button>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
          className="showpassword"
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          >{showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>

      <p className="signup-text">
        Don't have an account ? <button className="signup" type="button" onClick={handleSignUp} href="#">Sign up</button>
      </p>
    </div>

    <p className="footer-text">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
    </p>
  </div>
);

}
