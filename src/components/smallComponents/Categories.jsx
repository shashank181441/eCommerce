import { createCategory, deleteCategory, getAllCategories } from "@/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

// Define categoryList outside the component
let categoryList = [];
let catlength ;

function Categories() {


  const [newCat, setNewCat] = useState("")
  const {
    data: categories,
    isLoading,
    error, refetch
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getAllCategories();
    },
  });

catlength = categories?.data.data.categories.length
console.log(catlength);
  // Update categoryList when categories data is available
  if (categories && categories.data && categories.data.data) {
    categoryList = categories.data.data.categories;
  }

  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h2>{error.message}</h2>;

  const handleSubmit = async(e) =>{
    e.preventDefault()
    await createCategory(newCat).then((res)=>console.log(res)).catch((err)=>console.error(err))
    setNewCat("");
    refetch();
  }

  return (
    <div>
      <h1>Categories</h1>
      {categoryList.map((category) => (
        <div key={category._id}>
          {category.name}:      {category._id} --------
          <button onClick={async ()=>{
            return await deleteCategory(category._id).then((res)=>{console.log(res.data); refetch()}).catch((err)=>console.error(err))
            }}>Delete</button>
        </div>

      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e=>setNewCat(e.target.value)} value={newCat}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Categories;
export { categoryList };
