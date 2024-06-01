import { type InventoryItemWithStatus } from ".";
import Button from "../../components/ui/button";

interface Props {
  inventory: InventoryItemWithStatus[];
  setInventory: (inventory: InventoryItemWithStatus[]) => void;
}

export default function InventoryTable({ inventory, setInventory }: Props) {
  const handleDeleteInventoryItem = (name: string) => {
    setInventory(inventory.filter((item) => item.name !== name));
  };

  return (
    <div className="inventory-list">
      <table>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((inventoryItem) => (
            <tr key={inventoryItem.name} className={inventoryItem.status || ""}>
              <td className="wrap item-name">{inventoryItem.name}</td>
              <td>{inventoryItem.quantity}</td>
              <td>
                <Button
                  label="❌"
                  onClick={() => handleDeleteInventoryItem(inventoryItem.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
