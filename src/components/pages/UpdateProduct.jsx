import React, { useEffect, useState } from "react";
import CreateProduct from "../smallComponents/CreateProduct";
import { createProduct, getAllCategories } from "@/api";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getProductById } from "@/api";
import UpdateProductForm from "../smallComponents/UpdateProductForm";

function UpdateProduct() {
  const params = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [formData, setFormData] = useState(null);

  const schema = z.object({
    category: z.string().min(2, "You need to select a category"),
    name: z.string().min(1, "You must give a name to the product"),
    description: z.string(),
    price: z.string(),
    stock: z.string(),
    mainImage: z.custom(),
    subImages: z.custom(),
  });
    useEffect(() => {
      if (productInfo) {
          setFormData({
              category: productInfo.data.data.category,
              name: productInfo.data.data.name,
              description: productInfo.data.data.description,
              price: productInfo.data.data.price,
              stock: productInfo.data.data.stock,
          });
      }
  }, []);

  console.log(params);

  const id = params.id;

//   const {
//     data: productInfo,
//     isLoading,
//     error,
//   } = useQuery({
//     queryFn: async () => {
//       const productInfo = await getProductById(id);
//       console.log("productInfo", productInfo);
//     //   setFormData({
//     //     category: productInfo.data.data.category,
//     //     name: productInfo.data.data.name,
//     //     description: productInfo.data.data.description,
//     //     price: productInfo.data.data.price,
//     //     stock: productInfo.data.data.stock,
//     //   });
//       return productInfo;
//     },
//     queryKey: ["productInfo", id],
//   });
const {data: productInfo, isLoading, error} = useQuery({queryFn:()=>getProductById(id), queryKey:['productInfo', id]} )
  console.log(productInfo?.data.data);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (productInfo.data.data.category) return <UpdateProductForm productInfo={productInfo.data.data}/>
}

export default UpdateProduct;
