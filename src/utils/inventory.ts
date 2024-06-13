export type InventoryItemsMap = Map<
  string,
  { quantity: number; status: "new" | "edited" | "saved" }
>;

export const INVENTORY_KEY = "INVENTORY";

export default function getInventoryMapFromArray(
  inventoryArray: InventoryItem[]
) {
  const inventoryMap: InventoryItemsMap = new Map(
    inventoryArray.map((item) => [
      item.name,
      { quantity: item.quantity, status: "saved" },
    ])
  );

  return inventoryMap;
}

export function getSavedInventoryMap() {
  const savedInventory: Array<
    [string, { quantity: number; status: "new" | "edited" | "saved" }]
  > = JSON.parse(sessionStorage.getItem(INVENTORY_KEY) || "[]");

  return new Map(savedInventory);
}

export function setSavedInventory(inventoryMap: InventoryItemsMap) {
  const inventoryArray = Array.from(inventoryMap);

  sessionStorage.setItem(INVENTORY_KEY, JSON.stringify(inventoryArray));
}
