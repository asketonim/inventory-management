import "./styles.css";

import { useEffect, useState } from "react";
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
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch) {
      getInventory().then((data) => {
        setInventory(data);
      });

      setRefetch(false);
    }
  }, [refetch]);

  const handleSaveInventory = async () => {
    const newInventory = inventory.map(({ name, quantity }) => ({
      name,
      quantity,
    }));

    await saveInventory({
      inventory: newInventory,
    }).then(() => {
      setRefetch(true);
    });
  };

  const handleResetInventory = async () => {
    await resetInventory().then(() => {
      setRefetch(true);
    });
  };

  return (
    <main className="page inventory">
      <InventoryItemForm inventory={inventory} setInventory={setInventory} />
      <Link to="/create">+ Create Product</Link>
      <InventoryTable inventory={inventory} setInventory={setInventory} />
      <div className="controls">
        <Button label="Reset" onClick={handleResetInventory} />
        <Button label="Save" onClick={handleSaveInventory} />
      </div>
    </main>
  );
}
