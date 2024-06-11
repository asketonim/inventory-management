import request from "./request";

export async function getProducts() {
  const res: { error: string; data: Product[] } = await request("/product/all");

  return res;
}

export async function addProduct(name: string) {
  const res: { error: string; data: Product[] } = await request(
    "/product",
    "PUT",
    { name }
  );

  return res;
}
