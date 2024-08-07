import React, { useEffect, useRef } from "react";
import SideBar from "./SideBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  toggler,
  deleteToggler,
  closeBox,
  updateTagValue,
  updateTodoValue,
} from "../store";
import { useSelector } from "react-redux";
import CreateTodoModal from "./CreateTodoModal";
import DeleteToggle from "./DeleteToggle";

const DisplayPage = () => {
  const dispatch = useDispatch();
  const boxRef = useRef(null);
  const iconRef = useRef(null);

  const isBoxOpen = useSelector((state) => state.todo.isBoxOpen);
  const todoValue = useSelector((state) => state.todo.todoSearchValue);
  const tagValue = useSelector((state) => state.todo.tagsSearchValue);

  const handleTodoChange = (e) => {
    dispatch(updateTodoValue(e.target.value))
  };
  const handleTagChange = (e) => {
    dispatch(updateTagValue(e.target.value))
  };

  const handleClickOutside = (event) => {
    if (
      boxRef.current &&
      !boxRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      dispatch(closeBox());
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleToogle = () => {
    dispatch(toggler());
  };

  const isDeleteBoxOpen = useSelector((state) => state.todo.isDeleteBoxOpen);

  const handleDialogBoxToggle = () => {
    dispatch(deleteToggler());
  };

  return (
    <div className="flex gap-10  px-10 py-5">
      <SideBar tagValue={tagValue} handleChange={handleTagChange} />
      <div className="w-full ">
        <div className="flex justify-between items-center">
          <input
            value={todoValue}
            onChange={handleTodoChange}
            type="text"
            placeholder="Search for todo's"
            className="outline-none w-96 placeholder:text-gray-600"
          />{todoValue}
          <div className="flex gap-4">
            <div className="">
              <div
                ref={iconRef}
                className="flex text-3xl cursor-pointer"
                onClick={handleDialogBoxToggle}
              >
                <RiDeleteBin6Line />
                <FaCaretDown />
              </div>

              <DeleteToggle isDeleteBoxOpen={isDeleteBoxOpen} boxRef={boxRef} />
            </div>

            <IoMdAdd
              onClick={handleToogle}
              className="cursor-pointer text-3xl"
            />
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
