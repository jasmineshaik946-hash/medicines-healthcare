import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const categories = ["All", ...new Set(items.map((p) => p.category))];
  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  if (status === "loading" || status === "idle") return <p>Loading...</p>;
  if (status === "failed")
    return <p>Error: {error}. Is json-server running on port 3001?</p>;

  return (
    <div>
      <div className="filters">
        <input
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <p className="result-count">{filtered.length} products found</p>
      <div className="grid">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
