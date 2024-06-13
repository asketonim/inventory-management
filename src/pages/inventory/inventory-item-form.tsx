import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Select from "../../components/ui/select";
import { type InventoryItemsMap } from "../../utils/inventory";

interface Props {
  inventory: InventoryItemsMap;
  setInventory: (inventory: InventoryItemsMap) => void;
}

export default function InventoryItemForm({ inventory, setInventory }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("--");
  const [quantity, setQuantity] = useState(1);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProducts().then(({ error, data }) => {
      setProducts(data);
      setErrorMessage(error);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleAddInventoryItem(selectedProduct, quantity);

    setSelectedProduct("--");
    setQuantity(1);
  };

  const handleAddInventoryItem = (name: string, quantity: number) => {
    const updatedInventoryMap = new Map(inventory);
    const currentItem = updatedInventoryMap.get(name);

    if (currentItem) {
      updatedInventoryMap.set(name, {
        quantity: currentItem.quantity + quantity,
        status: "edited",
      });

      setInventory(updatedInventoryMap);
    } else {
      updatedInventoryMap.set(name, { quantity, status: "new" });

      setInventory(updatedInventoryMap);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["add-inventory-item"]}>
        <Select
          label="Product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          options={products}
        />
        <Input
          className={styles.quantity}
          min={1}
          type="number"
          label="Quantity"
          value={Number(quantity).toString()}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Button
          label="Add Product"
          type="submit"
          disabled={selectedProduct === "--"}
        />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
