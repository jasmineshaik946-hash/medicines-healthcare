import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./BuyNowModal.css";

export default function BuyNowModal({ product, items, total: cartTotal, onClose, onOrderSuccess }) {
  const { user } = useAuth();
  const isCart = Boolean(items && items.length);

  const [qty, setQty] = useState(1);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const itemTotal = isCart ? cartTotal : (product ? product.price * qty : 0);
  const deliveryFee = 0; // Free delivery
  const finalTotal = itemTotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!address.trim()) {
      setError("Please enter your delivery address");
      return;
    }
    if (!pincode.trim() || pincode.trim().length < 6) {
      setError("Please enter a valid 6-digit PIN code");
      return;
    }

    setError("");
    const randomId = "MED-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderPlaced(true);
    if (onOrderSuccess) onOrderSuccess();
  };

  return (
    <div className="buynow-overlay" onClick={onClose}>
      <div className="buynow-modal" onClick={(e) => e.stopPropagation()}>
        <button className="buynow-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {!orderPlaced ? (
          <>
            <div className="buynow-header">
              <span className="buynow-badge">⚡ Instant Checkout</span>
              <h2>Buy Now</h2>
              <p>Complete your purchase in a few quick steps</p>
            </div>

            {isCart ? (
              <div className="buynow-cart-list">
                {items.map((item) => (
                  <div key={item.id} className="buynow-cart-row">
                    <span className="buynow-cart-name">{item.name} × {item.qty}</span>
                    <strong className="buynow-cart-price">₹{item.price * item.qty}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <div className="buynow-product-card">
                <img
                  src={product?.image}
                  alt={product?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/100x100/0a8f7a/ffffff?text=${encodeURIComponent(product?.name || "Product")}`;
                  }}
                />
                <div className="buynow-product-info">
                  <h4>{product?.name}</h4>
                  <span className="buynow-cat">{product?.category}</span>
                  <div className="buynow-price-row">
                    <strong>₹{product?.price} each</strong>
                    <div className="buynow-qty-selector">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                      >
                        -
                      </button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => setQty((q) => q + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="buynow-form">
              <h3>Delivery Details</h3>

              {error && <div className="buynow-error">{error}</div>}

              <div className="buynow-form-row">
                <div className="buynow-input-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="buynow-input-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
              </div>

              <div className="buynow-input-group">
                <label>Delivery Address *</label>
                <textarea
                  placeholder="House/Flat No., Street, Landmark, City"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="buynow-input-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  placeholder="6-digit PIN code"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <h3>Payment Method</h3>
              <div className="buynow-payment-options">
                <label className={`buynow-pay-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💵 Cash on Delivery (COD)</span>
                </label>
                <label className={`buynow-pay-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI / Google Pay / PhonePe</span>
                </label>
                <label className={`buynow-pay-option ${paymentMethod === "card" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 Credit / Debit Card</span>
                </label>
              </div>

              <div className="buynow-summary">
                <div className="buynow-summary-row">
                  <span>Items Total ({isCart ? items.reduce((s, i) => s + i.qty, 0) : qty} {qty === 1 && !isCart ? "item" : "items"}):</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div className="buynow-summary-row">
                  <span>Delivery Charges:</span>
                  <span className="buynow-free">FREE</span>
                </div>
                <div className="buynow-summary-row buynow-total-row">
                  <span>Total Amount:</span>
                  <strong>₹{finalTotal}</strong>
                </div>
              </div>

              <button type="submit" className="buynow-submit-btn">
                Confirm & Place Order • ₹{finalTotal}
              </button>
            </form>
          </>
        ) : (
          <div className="buynow-success">
            <div className="buynow-success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p className="buynow-order-id">Order ID: <strong>#{orderId}</strong></p>

            <div className="buynow-success-details">
              <div className="buynow-success-item">
                {isCart ? (
                  <div>
                    <h4>{items.length} Products Ordered</h4>
                    <p>Total Items: {items.reduce((s, i) => s + i.qty, 0)} • ₹{finalTotal}</p>
                  </div>
                ) : (
                  <>
                    <img src={product?.image} alt={product?.name} />
                    <div>
                      <h4>{product?.name}</h4>
                      <p>Quantity: {qty} • ₹{finalTotal}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="buynow-success-meta">
                <p><strong>Deliver To:</strong> {name}, {address} ({pincode})</p>
                <p><strong>Contact:</strong> +91 {phone}</p>
                <p><strong>Payment:</strong> {paymentMethod.toUpperCase()}</p>
                <p className="buynow-delivery-badge">🚚 Expected Delivery: Within 24-48 Hours</p>
              </div>
            </div>

            <button className="buynow-continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
