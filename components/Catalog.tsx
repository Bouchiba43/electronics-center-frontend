"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/models/product";
import ProductList from "@/components/ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    <ProductList products={products}/>
  );
};

export default Catalog;
