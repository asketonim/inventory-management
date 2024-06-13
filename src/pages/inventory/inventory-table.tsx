import styles from "./styles.module.css";

import Button from "../../components/ui/button";
import { type InventoryItemsMap } from "../../utils/inventory";

interface Props {
  inventory: InventoryItemsMap;
  setInventory: (inventory: InventoryItemsMap) => void;
}

export default function InventoryTable({ inventory, setInventory }: Props) {
  const handleDeleteInventoryItem = (name: string) => {
    const updatedInventoryMap = new Map(inventory);

    updatedInventoryMap.delete(name);
    setInventory(updatedInventoryMap);
  };

  return (
    <div className={styles["inventory-list"]}>
      <table>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(inventory).map(([name, item]) => (
            <tr key={name} className={item.status ? styles[item.status] : ""}>
              <td className={`wrap ${styles["item-name"]}`}>{name}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  label="❌"
                  onClick={() => handleDeleteInventoryItem(name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
