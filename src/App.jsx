import { useState } from "react";
import { products } from "./data/products";
import { getRecommendations } from "./api/openrouter";
import Navbar from "./components/Navbar";
import RecommendationInput from "./components/RecommendationInput";
import ProductList from "./components/ProductList";
import "./index.css";

function App() {
    const [query, setQuery] = useState("");
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRecommend = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setRecommended([]); 

        try {
            const ids = await getRecommendations(query, products);
            const filtered = products.filter((l) => ids.includes(l.id));
            setRecommended(filtered);
        } catch (error) {
            console.error("AI Error:", error);
        }

        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "100px",
                background: "linear-gradient(135deg, #1e2dbbff, #866eacff)"
            }}
        >
            <Navbar />
            <div
                style={{
                    background: "white",
                    padding: "40px",
                    borderRadius: "20px",
                    width: "90%",
                    maxWidth: "900px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
            >

                <RecommendationInput
                    query={query}
                    setQuery={setQuery}
                    handleRecommend={handleRecommend}
                    loading={loading}
                />

                <p style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
                    ! Only laptop recommendations are available right now.
                </p>

                {loading ? (
                    <p
                        style={{
                            fontSize: "18px",
                            marginTop: "20px",
                            textAlign: "center"
                        }}
                    >
                        ⏳ Getting recommendations…
                    </p>
                ) : (
                    <ProductList products={recommended} />
                )}
            </div>
        </div>
    );
}

export default App;
