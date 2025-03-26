import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";

import {
  Typography,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
const NavBar = () => {
  const options = ["name", "email", "company"]
  const [option, setOption] = useState("name");
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const navigate = useNavigate();
  function handleSearch(e){
    navigate(`/search?value=${search}&option=${option}`);
  }
    const Logout = () => {
      axios
        .get("/api/api/v1/user/logout")
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            window.location.href = "/log-in";
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
  return (
    <div className="grid grid-cols-12 gap-4 justify-center items-center py-4 px-2 md:px-8 xl:px-16  shadow-md text-white bg-gray-900 ">
      
        <div className="col-span-2 lg:col-span-1 flex justify-center items-center md:text-2xl">
          <Link to="/home"><i class="bi bi-house-fill"></i>Home</Link>
        </div>
      

      <div className="px-4 md:px-8 xl:px-16 col-span-10 lg:col-span-5 flex justify-end items-center gap-8 ">
        <Link to="/student-list">
          <Typography className="text-xl md:text-2xl">
            <i class="bi bi-people-fill"></i>
          </Typography>
        </Link>

        <Typography className="text-xl md:text-2xl">
          <i class="bi bi-chat-dots-fill"></i>
        </Typography>

        <Typography className="text-xl md:text-2xl">
          <i class="bi bi-file-earmark-break-fill"></i>
        </Typography>
        <Link to="/log-out">
         <Typography className="text-xl md:text-2xl" onClick={Logout}>
          <i class="bi bi-box-arrow-right"></i>
        </Typography>
        </Link>
       
      </div>
      <div className=" col-span-12 lg:pl-8 xl:pl-16 lg:col-span-6 flex justify-center items-center px-4 ">
        <div className="relative flex w-full">
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button
                ripple={false}
                variant="text"
                color="blue-gray"
                className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3">
                {option}
              </Button>
            </MenuHandler>
            <MenuList className="max-h-[20rem] max-w-[18rem]">
              {options.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item}
                    className="flex items-center gap-2"
                    onClick={() => setOption(item)}>
                    {item}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <div className="w-full flex gap-4">
            <Input
              type="tel"
              placeholder={option}
              className="rounded-l-none !bg-gray-200 !border-t-blue-gray-200 focus:!border-blue-gray-200 text-blue-gray-200"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              onChange={handleChange}
            />
            <button className="" onClick={handleSearch}>
              {" "}
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
