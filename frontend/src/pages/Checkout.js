import { useSelector, useDispatch } from "react-redux";
import { clearCart, applyCoupon } from "../redux/cartSlice";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_live_51QpwiCP8A6J9koQO9O8zPvw8DpIyD8y7LHBqpC3CrDLcqA1akyfgme7tu2OhulsX51qqCj7pc69Us6m2BVG0CV4p007me751Ji");

function Checkout() {
  const { items, total, discount, coupon } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCouponApply = () => {
    dispatch(applyCoupon(couponCode));
  };

  const handlePayment = async () => {
    if (!user) {
      setErrorMessage("Please log in to proceed with payment.");
      return;
    }

    try {
      const stripe = await stripePromise;
      const res = await axios.post("http://localhost:5000/api/payment", { 
        items, 
        userId: user.uid 
      });

      if (res.data.error) {
        setErrorMessage(res.data.error);
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: res.data.sessionId });

      if (result.error) {
        setErrorMessage(result.error.message);
      }  else {
        dispatch(clearCart()); // Clear cart after successful payment
        navigate("/orders"); // Redirect to Orders page
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
      console.error("Payment Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {items.map((item) => (
        <p key={item._id}>
          {item.name} - ${item.price.toFixed(2)} x {item.quantity}
        </p>
      ))}
      
      <h3>Subtotal: ${total.toFixed(2)}</h3>
      <input
        type="text"
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <button onClick={handleCouponApply}>Apply Coupon</button>
      
      {coupon && <h3>Discount ({coupon}): -${discount.toFixed(2)}</h3>}
      <h2>Total: ${(total - discount).toFixed(2)}</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button onClick={handlePayment}>Proceed to Payment</button>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}

export default Checkout;
