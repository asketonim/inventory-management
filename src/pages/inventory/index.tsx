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
import getInventoryMap, {
  getSavedInventoryMap,
  setSavedInventory,
  type InventoryItemsMap,
} from "../../utils/inventory";

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItemsMap>(new Map());
  const [errorMessage, setErrorMessage] = useState("");

  const handleSetInventory = useCallback((inventoryMap: InventoryItemsMap) => {
    // set local state and save to sessionStorage

    setInventory(inventoryMap);
    setSavedInventory(inventoryMap);
  }, []);

  useEffect(() => {
    const savedInventoryMap = getSavedInventoryMap();

    if (savedInventoryMap.size !== 0) {
      // inventory is present in session storage

      setInventory(savedInventoryMap);
    } else {
      // inventory has to be loaded from the server

      getInventory().then(({ data, error }) => {
        const inventoryMap = getInventoryMap(data);

        handleSetInventory(inventoryMap);
        setErrorMessage(error);
      });
    }
  }, [handleSetInventory]);

  const handleSaveInventory = useCallback(async () => {
    const { data, error } = await saveInventory({
      inventory: Array.from(inventory, ([name, item]) => ({
        name,
        quantity: item.quantity,
      })),
    });

    if (!error) {
      const inventoryMap = getInventoryMap(data);
      handleSetInventory(inventoryMap);
    }

    setErrorMessage(error);
  }, [inventory, handleSetInventory]);

  const handleResetInventory = useCallback(async () => {
    const { error } = await resetInventory();

    if (!error) {
      handleSetInventory(new Map());
    }

    setErrorMessage(error);
  }, [handleSetInventory]);

  return (
    <main className={`page ${styles.inventory}`}>
      <InventoryItemForm
        inventory={inventory}
        setInventory={handleSetInventory}
      />
      <Link to="/create">+ Create Product</Link>
      {errorMessage && <p>{errorMessage}</p>}
      <InventoryTable inventory={inventory} setInventory={handleSetInventory} />
      <div className={styles.controls}>
        <Button label="Reset" onClick={handleResetInventory} />
        <Button label="Save" onClick={handleSaveInventory} />
      </div>
    </main>
  );
}
