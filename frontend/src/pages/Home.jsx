import React, {useEffect, useState} from "react";
import Layout from "../laytout/layout";
import {CardDefault} from "../components/CardDefault";
import {DefaultPagination} from "../components/DefaultPagination";
import {SimplePagination} from "../components/PostPagination";
import {PostCard} from "../components/PostCard.jsx";
import {SideProfile} from "../components/sideProfile";
import axios from "axios";
function Home() {
  const [inputValue, setInputValue] = useState("");
  const [valueArray, setValueArray] = useState([]);
  const [array, setArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postSelected, setPostSelected] = useState(null);
  const totalPages = valueArray.length / 12;
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    (async () => {
      const res = await axios
        .get("/api/api/v1/post/allPosts")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      setValueArray(res.data);
      setArray(res.data.slice(0, 12));
    })();
  }, []);

  const handleButtonClick = () => {
    console.log(inputValue);
  };
  return (
    <Layout>
      {array.map((element) => {
        return (
          <div className="w-full grid grid-cols-11 mt-2 ">
            <div className="col-span-3 p-6 flex justify-center items-center bg-gray-900 rounded-tr-2xl rounded-br-2xl">
              <SideProfile item={element} />
            </div>
            <div className="col-span-8 ">
              <PostCard item={element} />
            </div>
          </div>
        );
      })}
      <div className="flex justify-center mt-4">
        <SimplePagination
          {...{
            totalPages: parseInt(
              valueArray.length % 12 > 0 ? totalPages + 1 : totalPages
            ),
            currentPage,
            setCurrentPage,
            setArray,
            array,
            valueArray,
            setValueArray,
          }}
        />{" "}
        {/* I have to pass an array consisting of the page numbers. Pass the setStep function as a prop */}
      </div>
    </Layout>
  );
}

export default Home;
