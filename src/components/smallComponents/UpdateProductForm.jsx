import React, { useEffect, useState } from "react";
import CreateProduct from "../smallComponents/CreateProduct";
import { createProduct, getAllCategories, updateProduct } from "@/api";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getProductById } from "@/api";

function UpdateProductForm({productInfo}) {
  const params = useParams();
  const [allCategories, setAllCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [formData, setFormData] = useState(null);

  const schema = z.object({
    category: z.string().min(2, "You need to select a category"),
    name: z.string().min(1, "You must give a name to the product"),
    description: z.string(),
    price: z.custom(),
    stock: z.custom(),
    mainImage: z.custom(),
    subImages: z.custom(),
  });
    useEffect(() => {
      if (productInfo) {
          setFormData(productInfo);
      }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAllCategories(categories.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    // setAllCategories(categoryList)
  }, [refresh]);

  console.log(params);

  const id = params.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {...productInfo, stock: parseFloat(productInfo.stock),price: parseFloat(productInfo.price), },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    console.log(Array.from(formData));
    const updateRes = await updateProduct(id, formData);
    console.log(updateRes);
    return updateRes
  };

  if (!productInfo) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category select */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {allCategories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={() => setRefresh(!refresh)}>Refresh list</button>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description")}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            onChange={(e) => {
              // Parse the input value as a number and set it as the input value
              e.target.value = parseFloat(e.target.value);
            }}
            {...register("price")}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            onChange={(e) => {
              // Parse the input value as a number and set it as the input value
              e.target.value = parseFloat(e.target.value);
            }}
            {...register("stock")}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="mainImage"
            className="block text-sm font-medium text-gray-700"
          >
            Main Image
          </label>
          <input
            type="file"
            id="mainImage"
            {...register("mainImage")}
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.mainImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mainImage.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="subImages"
            className="block text-sm font-medium text-gray-700"
          >
            Sub Images
          </label>
          <input
            type="file"
            id="subImages"
            {...register("subImages")}
            multiple
            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.subImages && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subImages.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateProductForm;
