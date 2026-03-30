import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../components/counterSlice";


const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const paymentHandler = async () => {
    try {
      const res = await fetch("http://localhost:5300/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: "inr",
          description: "Test Order from Ashu Enterprises",
         "customer email": "test@example.com",
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl relative">
        
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">
          ✖
        </button>

        <div className="flex gap-6">
          <img src={product.image} alt="" className="w-1/2 object-contain" />

          <div>
            <h2 className="text-xl font-bold">{product.title}</h2>

            <p className="text-yellow-500 mt-2">
              ⭐⭐⭐⭐☆ ({product.reviews})
            </p>

            <p className="text-2xl font-bold mt-3">₹{product.price}</p>

            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* BUY NOW */}
            <button
              onClick={paymentHandler}
              className="mt-5 bg-yellow-500 px-4 py-2 rounded-lg"
            >
              Buy Now 
            </button>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="mt-3 ml-3 bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;