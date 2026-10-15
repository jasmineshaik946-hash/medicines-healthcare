import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import BuyNowModal from "./BuyNowModal";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showBuyNow, setShowBuyNow] = useState(false);

  return (
    <>
      <div className="card">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; // stop infinite error loop
            e.target.src = `https://placehold.co/300x200/0a8f7a/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p>{product.description}</p>
        <strong>₹{product.price}</strong>
        <div className="card-buttons">
          <button
            type="button"
            className="btn-cart"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="btn-buynow"
            onClick={() => setShowBuyNow(true)}
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>

      {showBuyNow && (
        <BuyNowModal
          product={product}
          onClose={() => setShowBuyNow(false)}
        />
      )}
    </>
  );
}
