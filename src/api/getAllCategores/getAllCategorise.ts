// api/getAllCategores/getAllCategorise.ts
export default async function getAllCategorise() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const { data } = await res.json();
  return data;
}
