import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api";
import ProductPageTry from "../tryout/ProductPage";

function ProductPage() {
  const params = useParams();
  console.log(params);

  const id = params.id;

  const {
    data: productInfo,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["productInfo", id],
  });
  console.log(productInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ProductPageTry productInfo={productInfo.data.data} />
    </div>
  );
}

export default ProductPage;
