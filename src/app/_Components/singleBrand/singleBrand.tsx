import getSingleBrand from "@/api/getAllBrand/selectBrand.api";

export default async function SingleBrandPage({ params }: { params: { id: string } }) {
  const data = await getSingleBrand(params.id);
  const brand = data?.data;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl text-center">
      <img
        src={brand.image}
        alt={brand.name}
        className="w-40 h-40 object-contain mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold text-indigo-700">{brand.name}</h1>
      <p className="text-gray-600 mt-4">
        ID: <span className="font-mono">{brand._id}</span>
      </p>
    </div>
  );
}
