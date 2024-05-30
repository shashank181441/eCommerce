import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const baseURL = 'http://localhost:8080/api/v1';

let accessToken = localStorage.getItem('accessToken') || '';

const apiClient = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${accessToken}` },
});

apiClient.interceptors.request.use(async (req) => {

    accessToken = localStorage.getItem('accessToken') || '';
    req.headers.Authorization = `Bearer ${accessToken}`;


  if (!accessToken) {
    console.log("you must log in first");
    return req;
  }

  const user = jwtDecode(accessToken);

  const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 0;


  if (!isExpired) return req;

  const refreshToken = localStorage.getItem('refreshToken');
  console.log(refreshToken);
  let response;

  try {
    response = await axios.post(`/users/refresh-token`, {
      refreshToken,
    })
  } catch (error) {
    console.error("refreshToken error", error );
  }
  console.log(response);
  if (!response) {
    console.log("You must log in");
    localStorage.clear()
  }

  localStorage.setItem('accessToken', response.data.data.accessToken);
  localStorage.setItem('refreshToken', response.data.data.refreshToken);

  req.headers.Authorization = `Bearer ${response.data.accessToken}`;

  return req;
}, error => {
  return Promise.reject(error);
});

// Function to register a new user
const registerUser = async (userData) => {
    // Send a POST request to register the user
    return await apiClient.post("/users/register", userData).catch(err=>{throw err})
  };
  
  // Function to log in a user
  const loginUser =  async (userData) => {
    // Send a POST request to log in the user
    const res = await apiClient.post("/users/login", userData)
    localStorage.setItem('accessToken', res.data.data.accessToken);
    localStorage.setItem('refreshToken', res.data.data.refreshToken);
    return res
    
  };
  
  // Function to log out a user
  const logoutUser = async () => {
    // Send a POST request to log out the user
    let res;
  try {
    res = await apiClient.post("/users/logout")
    localStorage.clear()
  } catch (error) {
    res=error
  }
    return res
  };

  const getCurrentUser = async () => {
    return await apiClient.get("/users/current-user")
  }

//   Get user profile
const getProfile = () => {
    return apiClient.get('/ecommerce/profile');
}

// Update Profile
const updateProfile = (data) => {
    return apiClient.patch('/ecommerce/profile', data);
}

// Get my orders
const getmyOrders = (page=1, limit=10) => {
    return apiClient.get(`ecommerce/profile/my-orders?page=${page}&limit=${limit}`)
}
// Get all products
const getProducts = ({page=1, limit=10}) => {
    return apiClient.get(`ecommerce/products?page=${page}&limit=${limit}`)
}

// Create product
const createProduct = (data) => {
    return apiClient.post('/ecommerce/products', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

// Get product by id
const getProductById = (productId) => {
    return apiClient.get(`/ecommerce/products/${productId}`);
}

// Delete product
const deleteProduct = (productId) => {
    return apiClient.delete(`/ecommerce/products/${productId}`);
}

// Update product
const updateProduct = (productId, data) => {
    return apiClient.patch(`/ecommerce/products/${productId}`, data);
}

// Get products by category
const getProductsByCategory = (categoryId) => {
    return apiClient.get(`/ecommerce/products/category/${categoryId}`);
}

// Remove sub image
const removeSubImage = (productId, subImageId) => {
    return apiClient.patch(`/ecommerce/products/remove/subimage/${productId}/${subImageId}`);
}

// Get user cart
const getUserCart = () => {
    return apiClient.get('/ecommerce/cart');
}

// Add item or update item quantity in cart
const addItemToCart = (productId, data) => {
    return apiClient.post(`/ecommerce/cart/item/${productId}`, data);
}

// Remove item from cart
const removeItemFromCart = (productId) => {
    return apiClient.delete(`/ecommerce/cart/item/${productId}`);
}

// Clear cart
const clearCart = () => {
    return apiClient.delete('/ecommerce/cart/clear');
}

// Get all categories
const getAllCategories = (page=1, limit=30) => {
    return apiClient.get(`/ecommerce/categories?page=${page}&limit=${limit}`);
}

// Create category
const createCategory = (data) => {
    return apiClient.post('/ecommerce/categories', {name: data});
}

// Get category by id
const getCategoryById = (categoryId) => {
    return apiClient.get(`/ecommerce/categories/${categoryId}`);
}

// Delete category
const deleteCategory = (categoryId) => {
    return apiClient.delete(`/ecommerce/categories/${categoryId}`);
}

// Update category
const updateCategory = (categoryId, data) => {
    return apiClient.patch(`/ecommerce/categories/${categoryId}`, data);
}

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    getProfile,
    updateProfile,
    getmyOrders,getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    getProductsByCategory,
    removeSubImage,
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getAllCategories,
    createCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
  };
  