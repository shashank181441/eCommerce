import React from "react";
import { Link } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

const ProductBox = ({ product, refetch }) => {
  return (
    <div className="group relative">

<Link to={`/product/${product._id}`}>
      <div className="aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40 h-64">
        <img
          src={product.mainImage.url}
          alt="Front of men's Basic Tee in black."
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-1 flex justify-between m-2">
        <div>
          <h3 className="text-md text-gray-700 dark:text-gray-50">
              {product.name.length > 25 ? product.name.slice(0, 25) + "..." : product.name}
            
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">Rs. {product.price}</p>
      </div>
      </Link>
      <div className="flex w-full justify-between">
        <DeleteProduct _id={product._id} refetch={refetch} />
        <Link to={`/updateProduct/${product._id}`}>Update</Link>
      </div>
    </div>
  );
};

export default ProductBox;
