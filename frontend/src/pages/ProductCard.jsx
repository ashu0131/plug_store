import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../components/counterSlice"; // ✅ correct path

const ProductCard = ({ product, onClick }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔥 prevents card click triggering modal
    dispatch(addToCart(product));
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-xl transition w-64"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain"
      />

      <h2 className="text-sm font-medium mt-2 line-clamp-2">
        {product.title}
      </h2>

      <div className="flex items-center mt-1">
        <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
        <span className="text-xs ml-1 text-gray-600">
          ({product.reviews})
        </span>
      </div>

      <p className="text-lg font-bold mt-1">
        ₹{product.price}
      </p>

      {/* ✅ ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-purple-500 text-white py-1 rounded-lg hover:bg-purple-600"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
};

export default ProductCard;