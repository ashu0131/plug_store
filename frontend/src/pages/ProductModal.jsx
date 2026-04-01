import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../components/counterSlice";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const API_URL = import.meta.env.VITE_GET_URI;

  const paymentHandler = async () => {
    try {
      const res = await fetch(`${API_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: "inr",
          description: "Test Order from Ashu Enterprises",
          email: "test@example.com", // ✅ FIXED KEY
        }),
      });

      const data = await res.json();

      if (data.status === "success" && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.log(err);
      alert("Backend not running");
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Added to cart ✅");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-3xl relative">
        
        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">
          ✖
        </button>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          
          {/* IMAGE */}
          <img
            src={product.image}
            alt=""
            className="w-full md:w-1/2 h-60 md:h-auto object-contain"
          />

          {/* DETAILS */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h2 className="text-lg md:text-xl font-bold">
                {product.title}
              </h2>

              <p className="text-yellow-500 mt-2 text-sm md:text-base">
                ⭐⭐⭐⭐☆ ({product.reviews})
              </p>

              <p className="text-xl md:text-2xl font-bold mt-3">
                ₹{product.price}
              </p>

              <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={paymentHandler}
                className="w-full sm:w-auto bg-yellow-500 px-4 py-2 rounded-lg"
              >
                Buy Now 💳
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
