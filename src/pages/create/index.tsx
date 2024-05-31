import "./styles.css";

import { useState } from "react";
import ProductForm from "./product-form";
import NewlyAddedProducts from "./newly-added";

export default function Create() {
  const [newProducts, setNewProducts] = useState<string[]>([]);

  const handleAddNewProduct = (productName: string) => {
    setNewProducts([...newProducts, productName]);
  };

  return (
    <main className="page create-product">
      <ProductForm addNewProduct={handleAddNewProduct} />
      <NewlyAddedProducts productNames={newProducts} />
    </main>
  );
}
