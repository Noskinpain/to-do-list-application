import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

const SideBar = ({ tagValue, handleChange }) => {
  return (
    <div className="w-1/5 ">
      <h1 className="text-3xl text-red-500 font-bold">Todo</h1>
      <input
        value={tagValue}
        onChange={handleChange}
        type="text"
        placeholder="Search for tags..."
        className="mt-5 placeholder:text-gray-600 outline-none"
      />
      {/* taglist will be showed here */}
  
  <div className="flex flex-col gap-[25rem] mt-10">

       <div>tags here</div>
      <div className="flex gap-2 items-center cursor-pointer w-fit">
      <MdAddCircleOutline className="text-2xl"/>
        <p className="text-gray-600">Add a new tag</p>
      </div>
      </div>
    </div>
  );
};

export default SideBar;
