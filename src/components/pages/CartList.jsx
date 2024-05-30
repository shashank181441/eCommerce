import { clearCart, getUserCart, removeItemFromCart } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";


function CartList() {
  const queryClient = useQueryClient();
  const userData = useSelector((state) => state.auth.userData.data);
  const {toast} = useToast()
  const {
    data: cartlist,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUserCart(),
    queryKey: ["cartlist"],
  });

  const {
    data,
    isPending,
    error: removeItemError,
    mutate,
  } = useMutation({
    mutationFn: async (id) => await removeItemFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartlist"] });
    },
  });
  const {
    data: clearingData,
    isPending: isClearing,
    error: clearCartError,
    mutate: clearMutate,
  } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartlist"] });
    },
  });
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1 className="text-2xl text-red-500">{error.message}</h1>;

  if (isPending) return <h1>Deleting...</h1>;
  if (removeItemError)
    return <h1 className="text-2xl text-red-500">{removeItemError.message}</h1>;

  if (cartlist.data.data.items.length <= 0) {
    return (
      <div className="w-full mx-auto">
        <h1 className="text-2xl text-gray-900 text-center">No cart Items</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between w-full py-2 px-5">
        <h1 className="text-2xl text-gray-900">My Cart</h1>
        <Button onClick={clearMutate}>Clear Cart</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4 my-2">
        {cartlist?.data?.data?.items.map((cartItem) => (
          <div
            key={cartItem?.product?._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={
                cartItem.product?.mainImage?.localPath ||
                cartItem.product?.mainImage?.url
              }
              alt=""
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg">
                {cartItem?.product?.name}
              </h3>
              <p className="mt-2 text-gray-600">
                {cartItem?.product?.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold text-xl">
                  Rs. {cartItem?.product?.price}
                </span>
                <button
                  onClick={() => async ()=>{
                    await mutate(cartItem.product._id).then(()=>{
                      toast({
                        title: "Item deleted from cart",
                      })
                    })
                    
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Remove
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-gray-700">Quantity: {cartItem.quantity}</p>
                <p className="text-gray-700">
                  Total: Rs. {cartItem?.quantity * cartItem?.product?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CartList;
