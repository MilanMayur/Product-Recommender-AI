import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
    if (products.length === 0) {
        return <p>No matching product found.</p>;
    }

    return (
        <div 
            style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "20px", 
                justifyContent: "center" 
            }}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
