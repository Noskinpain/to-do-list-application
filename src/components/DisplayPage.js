import React from "react";
import SideBar from "./SideBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggler } from "../store";
import { useSelector } from "react-redux";
import CreateTodoModal from "./CreateTodoModal";

const DisplayPage = () => {
  const dispatch = useDispatch();

  const isBoxOpen = useSelector((state) => state.toggleTodo.isBoxOpen);

  const handleToogle = () => {
    dispatch(toggler());
  };

  return (
    <div className="flex gap-10  px-10 py-5">
      <SideBar />
      <div className="w-full ">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search for todo's"
            className="outline-none w-96 placeholder:text-gray-600"
          />
          <div className="flex gap-4">
            <div className="flex text-3xl">
              <RiDeleteBin6Line />
              <FaCaretDown />
            </div>

            <IoMdAdd onClick={handleToogle} className="cursor-pointer text-3xl" />
            <CreateTodoModal
              isBoxOpen={isBoxOpen}
              handleToogle={handleToogle}
            />
          </div>
        </div>
        <div className="flex  justify-center w-full">
          <img
            className="w-[45rem] bg-center object-cover"
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?ga=GA1.1.295908696.1722924150&semt=sph"
            alt="empty-todolist-img"
          />
        </div>
        <h3 className="text-center text-2xl">
          It seems you don't have anything to do
        </h3>
      </div>
    </div>
  );
};

export default DisplayPage;
