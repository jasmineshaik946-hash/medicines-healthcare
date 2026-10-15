import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeQty, clearCart } from "../features/cartSlice";
import BuyNowModal from "../components/BuyNowModal";
import "./Cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const [showBuyNow, setShowBuyNow] = useState(false);

  if (items.length === 0) return <h3>Your cart is empty.</h3>;

  return (
    <>
      <div className="cart">
        {items.map((i) => (
          <div key={i.id} className="cart-item">
            <span>{i.name}</span>
            <div>
              <button onClick={() => dispatch(changeQty({ id: i.id, delta: -1 }))}>-</button>
              <span> {i.qty} </span>
              <button onClick={() => dispatch(changeQty({ id: i.id, delta: 1 }))}>+</button>
            </div>
            <span>₹{i.price * i.qty}</span>
            <button onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
          </div>
        ))}
        <div className="cart-checkout-bar">
          <h3>Total: ₹{total}</h3>
          <button
            type="button"
            className="cart-buynow-btn"
            onClick={() => setShowBuyNow(true)}
          >
            ⚡ Buy Now • Checkout
          </button>
        </div>
      </div>

      {showBuyNow && (
        <BuyNowModal
          items={items}
          total={total}
          onClose={() => setShowBuyNow(false)}
          onOrderSuccess={() => dispatch(clearCart())}
        />
      )}
    </>
  );
}
