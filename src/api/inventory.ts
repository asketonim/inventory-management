const BASE_URL = "http://34.238.153.187:8085";

export async function getInventory() {
  const res = await fetch(`${BASE_URL}/inventory`);

  const data: InventoryItem[] = await res.json();

  return data;
}

export async function resetInventory() {
  const res = await fetch(`${BASE_URL}/inventory`, {
    method: "POST",
  });

  if (res.ok) return { success: true };

  return { success: false };
}

export async function saveInventory({
  inventory,
}: {
  inventory: InventoryItem[];
}) {
  const res = await fetch(`${BASE_URL}/inventory`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(inventory),
  });

  if (res.ok) {
    return { success: true, message: "" };
  }

  const { error } = await res.json();

  return { success: false, message: error };
}
