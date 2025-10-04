import React from "react";

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalBox = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "80vh",
  overflowY: "auto",
  textAlign: "left",
};

export default function LegalModal({ type, onClose }) {
  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalBox} onClick={(e) => e.stopPropagation()}>
        <h2>{type === "terms" ? "Terms of Use" : "Privacy Policy"}</h2>
        <p>Last updated: October 4, 2025</p>

        {type === "terms" ? (
          <>
            <p>
              Welcome to <strong>Simple Todo</strong>! By using this app, you agree to these terms.
            </p>
            <p>
              You may sign in with Google, GitHub, or email. You are responsible for your account’s
              security. We collect minimal data (like your email and tasks) to operate this service.
            </p>
            <p>
              The app is provided “as is,” with no warranties. We’re not liable for any damages
              resulting from its use.
            </p>
            <p>Contact: 5pulkrabekradek@gmail.com</p>
          </>
        ) : (
          <>
            <p>
              We collect your email and profile info when you log in with Google, GitHub, or email.
              This is used only to manage your account and save your tasks.
            </p>
            <p>
              We do not sell or share your data. You can request deletion of your account by
              contacting us at 5pulkrabekradek@gmail.com.
            </p>
            <p>
              Cookies may be used to keep you logged in. You can clear them in your browser
              settings.
            </p>
            <p>Contact: 5pulkrabekradek@gmail.com</p>
          </>
        )}

        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Close
        </button>
      </div>
    </div>
  );
}
