import React from "react";
import getAllCategorise from "@/api/getAllCategores/getAllCategorise";
import CategorySlider from "./CategorySlaider";

export default async function CatogorySwiper() {
  const data = await getAllCategorise();

  return <CategorySlider data={data} />;
}
