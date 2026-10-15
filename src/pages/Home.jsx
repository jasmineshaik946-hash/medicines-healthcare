import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="hero">
      <h1>Your Health, Our Priority</h1>
      <p>Medicines and healthcare products delivered to you.</p>
      <Link to="/products" className="btn">Shop Now</Link>
    </div>
  );
}
