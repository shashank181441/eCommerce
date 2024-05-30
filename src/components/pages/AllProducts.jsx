import React, { useState } from "react";
// import { useParams } from 'react-router-dom'
import { getProducts } from "../../api";
import ProductBox from "../smallComponents/Product";
import { useQuery, useMutation } from "@tanstack/react-query";
import PaginationBar from "../smallComponents/PaginationBar";
import { Link, useParams } from "react-router-dom";
import DeleteProduct from "../smallComponents/DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import AllProductInfiniteQuery from "./AllProductInfiniteQuery";

function Home() {
const [message, setMessage] = useState("")

  const params = useParams();
  console.log(params);

  const {
    data: products,
    isLoading,
    error, refetch
  } = useQuery({
    queryKey: ["products", params?.page],
    queryFn: () => {
      if (!params.page) return getProducts({ limit: 8, page: 1 });
      else return getProducts({ limit: 8, page: params.page });
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {message &&  <p className="text-2xl text-green-600">{message}</p>}
      {console.log(products.data.data.products)}
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Our Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.data.data.products.map((product) => (
            <div key={product._id}>
            <ProductBox product={product} refetch={refetch} />
            
             </div>
          ))}
        </div>
      </div>
      <div>
        <PaginationBar
          totalPages={products.data.data.totalPages}
          limit={products.data.data.limit}
          page={products.data.data.page}
          totalProducts={products.data.data.totalProducts}
        />
      </div>
    </div>
  );
}

export default Home;
