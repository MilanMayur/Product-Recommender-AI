import React from "react";

export default function Navbar() {
    return (
        <div
            style={{
                width: "100%",
                padding: "15px 0",
                background: "#1e3a8a",
                position: "fixed",
                top: 0,
                left: 0,
                textAlign: "center",
                color: "white",
                fontSize: "22px",
                fontWeight: "600",
                letterSpacing: "1px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
        >
            🔍 AI Product Recommender
        </div>
    );
}
