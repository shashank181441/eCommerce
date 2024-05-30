import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { loginUser } from "@/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

useNavigate;

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const schema = zod.object({
    username: zod.string().min(3, "Username is required"),
    email: zod.string().email("Email is invalid"),
    password: zod.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
    await registerUser(data)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.error(err.response.data.message);
        setError(err.message);
      });
  };
  console.log(errors);

  return (
    <div className="justify-center place-content-center mx-auto items-center h-screen max-w-[30rem]">
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
            type="email"
            {...register("email")}
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
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
            Submit
          </button>
        </div>
        <p>
          If you already have an account, <Link to={"/login"}>login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
