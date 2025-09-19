export default async function getProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  const data = await res.json();
  return data.data; 
}
