import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import CreateTagModal from "./CreateTagModal";
import { useFetchTagsQuery } from "../store";
import TagItem from "./TagItem";
import Skeleton from "./Skeleton";

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
  handleDivClick,

  tagsToShow,
}) => {
  const { data, isLoading, error } = useFetchTagsQuery();

  let content;
  if (isLoading) {
    content = <Skeleton times={4} className="w-4/5 h-5" />;
  } else if (error) {
    content = (
      <div className="text-[10px] text-red-500">Error loading tags</div>
    );
  } else {
    content = data.map((tag) => {
      return (
        <TagItem
          key={tag.id}
          tag={tag}
          handleDivClick={handleDivClick}
          tagsToShow={tagsToShow}
         
        />
      );
    });
  }
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

      <div className="flex overflow-y-auto w-full h-[27rem] pr-3 flex-col gap-2 mt-10">
        {content}
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer w-fit pt-4"
        onClick={handleClick}
      >
        <MdAddCircleOutline className="text-2xl" />
        <p className="text-gray-600">Add a new tag</p>
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
