import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import CreateTagModal from "./CreateTagModal";
import { useFetchTagsQuery } from "../store";

const SideBar = ({
  tagValue,
  handleChange,
  toggleBox,
  handleClick,
  selectedColor,
  onChange,
  tagTitle,
  titleOnChange,
  resetTagForm,
}) => {
  const { data, isLoading, error } = useFetchTagsQuery();
  console.log(data);
  let content;
  if (isLoading) {
    content = <div className="text-[10px]">Loading tags....</div>;
  } else if (error) {
    content = (
      <div className="text-[10px] text-red-500">Error loading tags</div>
    );
  } else {
    content = data.map((tag) => {
      return <div key={tag.id} className="flex gap-3">
        <div  className="w-7 h-7 rounded-full opacity-60" style={{backgroundColor: tag.color}}>
        </div>
        <p>{tag.name}</p>
        </div>
    });
  }
  return (
    <div className="w-1/5">
      <h1 className="text-3xl text-red-500 font-bold">Todo</h1>
      <input
        value={tagValue}
        onChange={handleChange}
        type="text"
        placeholder="Search for tags..."
        className="mt-5 placeholder:text-gray-600 outline-none"
      />
      {/* taglist will be showed here */}

      <div className="flex flex-col gap-[10rem] mt-10">
        <div className="flex flex-col gap-2">{content}</div>
        <div
          className="flex gap-2 items-center cursor-pointer w-fit"
          onClick={handleClick}
        >
          <MdAddCircleOutline className="text-2xl" />
          <p className="text-gray-600">Add a new tag</p>
        </div>
      </div>
      <CreateTagModal
        toggleBox={toggleBox}
        handleClick={handleClick}
        selectedColor={selectedColor}
        onChange={onChange}
        title={tagTitle}
        titleOnChange={titleOnChange}
        resetTagForm={resetTagForm}
      />
    </div>
  );
};

export default SideBar;
