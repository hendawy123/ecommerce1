export default async function SelectedProduct(id : string) {
    const respos = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const {data} = await respos.json()
    
    console.log(data);
  return data;
}