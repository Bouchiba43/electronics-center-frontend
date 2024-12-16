"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true); // State for showing a loading indicator

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        const data = response.data as { content: any[] };
        setProducts(data.content || []); 
      } catch (error) {
        if (error) {
          setError((error as any).message || "An unexpected error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Center</h1>

      {loading && <p>Loading products...</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products available at the moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <p className="font-semibold text-lg">Name: {product.name}</p>
            <p className="text-gray-600">Description: {product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Brand: {product.brand}</p>
            <p>Type: {product.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
