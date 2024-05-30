import axios from "axios";
import React from "react";

function Login() {
  const login = async () => {
    await axios
      .post("http://192.168.1.123:8080/api/v1/users/login", {
        username: "doejohn",
        password: "test@123",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
