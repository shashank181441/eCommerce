import React, { useState } from "react";
import { addItemToCart } from "../../api";
import TodoTry from "./TodoTry";
import { useToast } from "../ui/use-toast";

const ProductPage = ({ productInfo }) => {
  console.log(productInfo);
  const {toast} = useToast()

  const [activeImg, setActiveImage] = useState(
    productInfo.mainImage.localPath || productInfo.mainImage.url
  );

  const [amount, setAmount] = useState(1);

  const addThisToCart = async () => {
    let cartAddData = await addItemToCart(productInfo._id, {
      quantity: amount,
    });
    console.log(cartAddData);
    return cartAddData;
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center mx-6 my-4">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24">
          <img
            src={productInfo.mainImage.localPath || productInfo.mainImage.url}
            alt=""
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() =>
              setActiveImage(
                productInfo.mainImage.localPath || productInfo.mainImage.url
              )
            }
          />
          {productInfo.subImages.map((subimg) => (
            <img
              key={subimg._id}
              src={subimg.localPath?.slice(6) || subimg.url}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(subimg.localPath || subimg.url)}
            />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          {/* <span className=" text-violet-600 font-semibold">
            Special Sneaker
          </span> */}
          <h1 className="text-3xl font-bold">{productInfo.name}</h1>
        </div>
        <p className="">{productInfo.description}</p>
        <h6 className="text-2xl font-semibold">$ {productInfo.price}</h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => prev - 1)}
              disabled={amount == 0}>
              -
            </button>
            <span className="py-4 px-6 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
              onClick={() => setAmount((prev) => prev + 1)}>
              +
            </button>
          </div>
          <button
            onClick={() => {
              addThisToCart().then(()=>{
                toast({
                  title:" Added to cart",
                  description: `${amount} ${productInfo.name} added to cart`,
                })
              })
            }}
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
