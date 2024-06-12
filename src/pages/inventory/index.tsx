import styles from "./styles.module.css";

import { useCallback, useEffect, useState } from "react";
import {
  getInventory,
  resetInventory,
  saveInventory,
} from "../../api/inventory";
import InventoryItemForm from "./inventory-item-form";
import InventoryTable from "./inventory-table";
import { Link } from "react-router-dom";
import Button from "../../components/ui/button";

export type InventoryItemWithStatus = InventoryItem & {
  status?: "new" | "edited";
};

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItemWithStatus[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getInventory().then(({ data, error }) => {
      setInventory(data);
      setErrorMessage(error);
    });
  }, []);

  const handleSaveInventory = useCallback(async () => {
    const newInventory = inventory.map(({ name, quantity }) => ({
      name,
      quantity,
    }));

    const { data, error } = await saveInventory({
      inventory: newInventory,
    });

    if (!error) {
      setInventory(data);
    }

    setErrorMessage(error);
  }, [inventory]);

  const handleResetInventory = useCallback(async () => {
    const { error } = await resetInventory();

    if (!error) {
      setInventory([]);
    }

    setErrorMessage(error);
  }, []);

  return (
    <main className={`page ${styles.inventory}`}>
      <InventoryItemForm inventory={inventory} setInventory={setInventory} />
      <Link to="/create">+ Create Product</Link>
      {errorMessage && <p>{errorMessage}</p>}
      <InventoryTable inventory={inventory} setInventory={setInventory} />
      <div className={styles.controls}>
        <Button label="Reset" onClick={handleResetInventory} />
        <Button label="Save" onClick={handleSaveInventory} />
      </div>
    </main>
  );
}
