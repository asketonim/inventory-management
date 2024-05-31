const BASE_URL = 'http://34.238.153.187:8085';

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/product/all`);

  const data: Product[] = await res.json();

  return data;
}
