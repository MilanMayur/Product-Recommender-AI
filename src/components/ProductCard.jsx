import React from "react";

export default function ProductCard({ product }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                width: "300px",
                marginBottom: "20px"
            }}
        >
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px"
                    }}
                />
            )}
            
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <a href={product.url} target="_blank">View Product</a>
        </div>
    );
}
