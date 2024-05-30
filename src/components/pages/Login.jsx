import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { login, logout } from "@/store/authSlice";
import * as zod from "zod";
import { loginUser } from "@/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  let response;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = zod.object({
    username: zod.string().min(3, "Username is required"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    await loginUser(data).then((userData) => {
      response = userData.data;
      console.log("login", response.data.user);
      if (userData) {
        dispatch(login({ userData: response.data.user }));
      } else {
        dispatch(logout());
      }
    });
    console.log(response);
    if (response) {
      console.log(response.data);
      navigate("/");
    } else {
      console.error("Login failed: No response or data found.");
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="place-content-center h-screen mx-auto items-center max-w-[25rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            type="text"
            {...register("username")}
            placeholder="Username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        <p>
          If you do not have an account, <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
