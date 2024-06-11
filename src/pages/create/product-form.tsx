import "./styles.css";

import { useCallback, useRef, useState } from "react";
import { addProduct } from "../../api/products";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { Link } from "react-router-dom";

interface Props {
  addNewProduct: (productName: string) => void;
}

export default function ProductForm({ addNewProduct }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const newProductName = inputRef?.current?.value || "";

      const { error } = await addProduct(newProductName);

      if (!error) {
        addNewProduct(newProductName);
        inputRef.current!.value = "";
      }

      setError(error);
    },
    [addNewProduct]
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`product-form ${error ? "error" : ""}`}
      >
        <Input
          onChange={() => setError("")}
          innerRef={inputRef}
          errorMessage={error}
          label="Product Name"
          type="text"
        />
        <Button
          label="Save"
          type="submit"
          disabled={!!error}
          className="save-product"
        />
        <Link to="/inventory">Go to Inventory</Link>
      </form>
    </div>
  );
}
