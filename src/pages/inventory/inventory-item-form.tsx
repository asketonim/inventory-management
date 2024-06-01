import "./styles.css";

import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Select from "../../components/ui/select";
import { InventoryItemWithStatus } from ".";

interface Props {
  inventory: InventoryItemWithStatus[];
  setInventory: (inventory: InventoryItemWithStatus[]) => void;
}

export default function InventoryItemForm({ inventory, setInventory }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("--");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleAddInventoryItem(selectedProduct, quantity);

    setSelectedProduct("--");
    setQuantity(1);
  };

  const handleAddInventoryItem = (name: string, quantity: number) => {
    const alreadyPresentInd = inventory.findIndex((item) => item.name === name);

    if (alreadyPresentInd !== -1) {
      const updatedInventory = [...inventory];
      updatedInventory[alreadyPresentInd].quantity += quantity;
      updatedInventory[alreadyPresentInd].status = "edited";

      setInventory(updatedInventory);
    } else {
      setInventory([...inventory, { name, quantity, status: "new" }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-inventory-item">
      <Select
        label="Product"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        options={products}
      />
      <Input
        className="quantity"
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
  );
}
