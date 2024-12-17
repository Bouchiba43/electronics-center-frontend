"use client";

import { useEffect, useState } from "react";
import { Product } from "@/models/product";
import Spinner from "@/components/Spinner";
import ProductList from "@/components/ProductList";
import agent from "@/utils/agent";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Store.list()
      .then((products) => setProducts(products.content))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (!products) return <h3>Unable to load Products</h3>;
  if (loading) return <Spinner message="Loading Products..." />;
  return <ProductList products={products} />;
};

export default Catalog;
