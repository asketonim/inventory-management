const BASE_URL = "http://34.238.153.187:8085";

export async function getInventory() {
  try {
    const res = await fetch(`${BASE_URL}/inventory`);

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }

    const data: InventoryItem[] | Record<string, never> = await res.json();

    return { error: "", inventory: Array.isArray(data) ? data : [] };
  } catch (error) {
    const errorMessage = `There was an error while fetching inventory: ${error}`;

    console.error(errorMessage);

    return { error: errorMessage, inventory: [] };
  }
}

export async function resetInventory() {
  const res = await fetch(`${BASE_URL}/inventory`, {
    method: "POST",
  });

  if (res.ok) {
    const { error, inventory } = await getInventory();

    return { error, data: inventory };
  }

  return { error: "Couldn't reset inventory", data: [] };
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
    const { error, inventory } = await getInventory();

    return { error, data: inventory };
  }

  const { error }: { error: string } = await res.json();

  return { error, data: [] };
}
