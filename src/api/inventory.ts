import request from "./request";

export async function getInventory() {
  const {
    error,
    data,
  }: { error: string; data: InventoryItem[] | Record<string, unknown> } =
    await request("/inventory");

  return { error, data: Array.isArray(data) ? data : [] };
}

export async function resetInventory() {
  const { error } = await request("/inventory/reset", "POST");

  return { error };
}

export async function saveInventory({
  inventory,
}: {
  inventory: InventoryItem[];
}) {
  const {
    error,
    data,
  }: { error: string; data: InventoryItem[] | Record<string, unknown> } =
    await request("/inventory", "POST", inventory);

  return { error, data: Array.isArray(data) ? data : [] };
}
