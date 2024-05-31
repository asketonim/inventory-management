const BASE_URL = "http://34.238.153.187:8085";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/product/all`);

  const data: Product[] = await res.json();

  return data;
}

export async function addProduct(
  productName: string
): Promise<{ success: boolean; message: string }> {
  console.log(productName);

  const res = await fetch(`${BASE_URL}/product`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      name: productName,
    }),
  });

  if (res.ok) {
    return { success: true, message: "" };
  }

  const { error } = await res.json();

  return { success: false, message: error };
}
