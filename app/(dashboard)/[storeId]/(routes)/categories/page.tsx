import React from "react";
import BillboardClient from "./components/client";
import prismadb from "@/lib/prismadb";

import { format } from "date-fns"
import { CategoryCoulmn } from "./components/columns";
import CategoryClient from "./components/client";

const CategoriesPage = async({
  params
}:{
  params: { storeId: string }
}) => {

  const categories = await prismadb.category.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:"desc"
    },
    include:{
      billboard: true
    }
  });


  const formatedCategories: CategoryCoulmn[] = categories.map((item)=>({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient
        data={formatedCategories}
        />
      </div>
    </div>
  )
};

export default CategoriesPage
