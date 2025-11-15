import React from "react";

export default function RecommendationInput({ query, setQuery, handleRecommend, loading }) {
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleRecommend();
        }
    };
    
    return (
        <div 
            style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                marginBottom: "20px" 
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="e.g., gaming laptop under 50000"
                style={{
                    padding: "10px",
                    width: "300px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
                disabled={loading}
            />
            <button
                onClick={handleRecommend}
                disabled={loading}
                style={{
                    padding: "10px 15px",
                    marginLeft: "10px",
                    background: "#4f46e5",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "Searching..." : "Get Recommendations"}
            </button>
        </div>
    );
}
