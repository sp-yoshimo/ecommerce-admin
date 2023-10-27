import React from "react";
import prismadb from "@/lib/prismadb";
import { ProductCoulmn } from "./components/columns";

import { format } from "date-fns"
import { formatter } from "@/lib/utils";
import ProductClient from "./components/client";

const ProductPage = async({
  params
}:{
  params: { storeId: string }
}) => {

  const products = await prismadb.product.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:"desc"
    },
    include:{
      category: true,
      size: true,
      color: true
    }
  });

  const formatedProducts: ProductCoulmn[] = products.map((item)=>({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient
        data={formatedProducts}
        />
      </div>
    </div>
  )
};

export default ProductPage;
