import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

export default function Create() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <main className="page">
        <ul>
          {products.map((product) => (
            <li key={product.name}>{product.name}</li>
          ))}
        </ul>
    </main>
  );
}
