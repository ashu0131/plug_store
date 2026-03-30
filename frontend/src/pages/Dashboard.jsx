import React, { useState } from "react";
import { useSelector } from "react-redux"; // ✅ FIXED
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import plugs from "./images/plugs.jpg";
import switchs from "./images/switchs.jpg";
import { useAuth } from "../context/AuthContext";
import Cart from "../components/Cart";

const products = [
  {
    id: 1,
    title: "smart plugs",
    price: 4295,
    reviews: 835,
    image: plugs,
    description: "Smart plug for home automation",
  },
  {
    id: 2,
    title: "smart switchs",
    price: 3995,
    reviews: 520,
    image: switchs,
    description: "Smart switch with app control",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const cartItems = useSelector((state) => state.cart.items); // ✅ FIXED

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      
      <h1>🛒 My Store</h1>

      {/* 👤 User Info (optional but useful) */}
      {user && <p>Welcome, {user.email}</p>}

      {/* 🛒 Cart Count */}
      <h2>Items in Cart: {cartItems.length}</h2>

      {/* 📦 Products */}
      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct}
          />
        ))}
      </div>

      <hr />

      {/* 🛒 Cart */}
      <Cart />

      {/* 🔥 Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}