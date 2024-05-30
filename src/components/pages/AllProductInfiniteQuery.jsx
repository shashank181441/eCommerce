import React, { useEffect, useState } from "react";
import { getProducts } from "../../api";
import ProductBox from "../smallComponents/Product";
import { useInfiniteQuery } from "@tanstack/react-query";
import PaginationBar from "../smallComponents/PaginationBar";
import { Link, useParams } from "react-router-dom";
import DeleteProduct from "../smallComponents/DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import { isPending } from "@reduxjs/toolkit";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";

function AllProductInfiniteQuery() {
  const [message, setMessage] = useState("");

  const params = useParams();
  console.log(params);

  const fetchProducts = async ({ pageParam = 1 }) => {
    try {
      const res = await getProducts({ limit: 8, page: pageParam });
    // const data = await res.json();
    return { ...res.data, prevOffset: pageParam };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  

  const {
    data: products,
    isPending, isFetching,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", params?.page],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      // Ensure lastPage is defined and has the expected structure
      if (lastPage?.data?.hasNextPage) {
        return lastPage.data.nextPage;
      }
    //   return false;
    },
  });

  const { ref, inView, entry } = useInView();
  useEffect(()=>{
      if (inView && products?.pages[0].data.hasNextPage) fetchNextPage()
  },[fetchProducts, inView])

  if (isPending) return <div>Loading...</div>;

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {products.pages.map((page, pageIndex) =>
        page.data.products.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))
      )}
        <div ref={ref}>{ isFetching ? <Loader className="animate-spin mx-auto justify-center items-center h-10 w-10 my-10"/>:"End of the list" }</div>
    </div>
  );
}

export default AllProductInfiniteQuery;
