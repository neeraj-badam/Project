import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item._id === product._id));

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px", textAlign: "center" }}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>

      {cartItem ? (
        <div>
          <button onClick={() => dispatch(decreaseQuantity(product._id))}>-</button>
          <span style={{ margin: "0 10px" }}>{cartItem.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity(product._id))}>+</button>
        </div>
      ) : (
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
