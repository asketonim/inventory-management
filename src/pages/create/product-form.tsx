import "./styles.css";

import { useState } from "react";
import { addProduct } from "../../api/products";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { Link } from "react-router-dom";

interface Props {
  addNewProduct: (productName: string) => void;
}

export default function ProductForm({ addNewProduct }: Props) {
  const [newProductName, setNewProductName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success, message } = await addProduct(newProductName);

    if (success) {
      addNewProduct(newProductName);
      setNewProductName("");
    } else {
      setError(message);
    }
  };

  const handlePoductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProductName(e.target.value);
    setError("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`product-form ${error ? "error" : ""}`}
      >
        <Input
          errorMessage={error}
          label="Product Name"
          type="text"
          value={newProductName}
          onChange={handlePoductNameChange}
        />
        <Button
          label="Save"
          type="submit"
          disabled={!newProductName || !!error}
          className="save-product"
        />
        <Link to="/inventory">Go to Inventory</Link>
      </form>
    </div>
  );
}
