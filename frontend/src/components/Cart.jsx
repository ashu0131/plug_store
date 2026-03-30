import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "./counterSlice"; // ✅ fix path

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const paymentCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5300/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total * 100,
          currency: "inr",
          description: "Cart Payment",
          "customer email": "test@example.com",
        }),
      });

      const data = await res.json();

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("Payment failed");
      }
    } catch (err) {
      console.log(err);
      alert("Backend not running");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {/* 🧾 Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow-md p-4 rounded-xl"
              >
                {/* Info */}
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-bold">{item.quantity}</span>

                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="font-bold">
                  ₹{item.price * item.quantity}
                </div>

                {/* Remove */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          {/* 💰 Summary */}
          <div className="mt-8 bg-gray-100 p-5 rounded-xl shadow-md">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={paymentCheckout}
              className="mt-5 w-full bg-purple-600 text-white py-3 rounded-xl text-lg hover:bg-purple-700 transition"
            >
              Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;