export default async function getSingleBrand(id: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (!res.ok) throw new Error("Failed to fetch brand");
    return res.json();
  }
  