import { deleteProduct } from '@/api';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function DeleteProduct({_id, refetch}) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(_id);
      console.log(res.data);
      refetch();
      toast({
        title: res.message || "Product Deleted",
        description: res.data?.name || "Product has been successfully deleted.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "There was an error deleting the product.",
        status: "error",
      });
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
      <button onClick={handleDelete}>
        <Trash2 />
      </button>
      </TooltipTrigger>
      <TooltipContent>Delete Product</TooltipContent>
      </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default DeleteProduct;
