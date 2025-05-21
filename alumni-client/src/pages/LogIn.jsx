import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
function LogIn() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logIn } = useUserStore();
  const handleLogIn = async ()=>{

    try {
       const success = await logIn(formData.email, formData.password);
       if(success){
        navigate("/")
       }

    } catch (error) {
      console.log("log in failed")
      navigate("/login")
    }
  }
  return (
    <div className="h-[calc(100vh-60px)] flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="relative w-96 flex flex-col justify-center p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
        <h2 className="text-3xl font-semibold text-white mb-4 text-center">
          Log In
        </h2>

        {/* Email Input */}
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-white text-lg font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-lg font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-white bg-white/10 leading-tight focus:outline-none focus:shadow-outline border-white/20 placeholder-white/50"
            placeholder="Password"
            value={formData.password}
            onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
          />
        </div>

        {/* Submit Button */}
        <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 mt-2 rounded-xl focus:outline-none focus:shadow-outline transition duration-200 cursor-pointer"
        onClick={handleLogIn}>
          Submit
        </button>
        <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="border-b cursor-pointer">register</Link></p>
      </div>
    </div>
  );
}

export default LogIn;
