import React, { useEffect, useRef, useState } from "react";
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
  toggleTagBox,
  setSelectedColor,
  UpdateTagTitle,
  updateTodoTitle,
  resetTag,
  resetTodo,
  updateTodoDescription,
} from "../store";
import { useSelector } from "react-redux";
import CreateTodoModal from "./CreateTodoModal";
import DeleteToggle from "./DeleteToggle";
import { useFetchTodosQuery} from "../store";
import Skeleton from "./Skeleton";
import Todo from "./Todo";

const DisplayPage = () => {
  const { data, isLoading, error } = useFetchTodosQuery();
  const [tagsToShow, setTagsToShow] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [todos, setTodos] = useState({});


  const dispatch = useDispatch();
  const boxRef = useRef(null);
  const iconRef = useRef(null);

  const isBoxOpen = useSelector((state) => state.todo.isBoxOpen);
  const todoValue = useSelector((state) => state.todo.todoSearchValue);
  const tagValue = useSelector((state) => state.tag.tagsSearchValue);
  const selectedColor = useSelector((state) => state.tag.selectedColor);
  const isTagBoxOpen = useSelector((state) => state.tag.isCreateTagBoxOpen);
  const tagTitle = useSelector((state) => state.tag.tagTitle);
  const todoTitle = useSelector((state) => state.todo.todoTitle);
  const todoDescription = useSelector((state) => state.todo.todoDescription);

  const handleTodoDescriptionUpdate = (e) => {
    dispatch(updateTodoDescription(e.target.value));
  };

  const handleTagTitleUpdate = (e) => {
    dispatch(UpdateTagTitle(e.target.value));
  };
  const handleTodoTitleUpdate = (e) => {
    dispatch(updateTodoTitle(e.target.value));
  };

  const onColorChange = (e) => {
    dispatch(setSelectedColor(e.target.value));
  };
  const handleTagBoxOpen = () => {
    dispatch(toggleTagBox());
  };

  const handleTodoChange = (e) => {
    dispatch(updateTodoValue(e.target.value));
  };
  const handleTagChange = (e) => {
    dispatch(updateTagValue(e.target.value));
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
    setIsEdit(false);
    dispatch(resetTodo());
    setSelectedTags([]);
  };

  const isDeleteBoxOpen = useSelector((state) => state.todo.isDeleteBoxOpen);

  const handleDialogBoxToggle = () => {
    dispatch(deleteToggler());
  };
  const resetTagForm = () => {
    dispatch(resetTag());
  };
  const resetTodoForm = () => {
    dispatch(resetTodo());
  };

  const handleDivClick = (tag) => {
    if (tagsToShow.some((t) => t.id === tag.id)) {
      setTagsToShow((prev) => prev.filter((t) => t.id !== tag.id));
    } else {
      setTagsToShow((prev) => [...prev, tag]);
    }
  };

  const handleOpenTodoEdit = (todo) => {
    setTodos(todo); // Store the selected todo in state
    dispatch(updateTodoTitle(todo.title)); // Pre-fill the title
    dispatch(updateTodoDescription(todo.description)); // Pre-fill the description
    setSelectedTags(todo.selectedTags); // Pre-fill the selected tags
    setIsEdit(true);
    dispatch(toggler()); // Open the modal


  };
  
  const clearSelectedTags = () => {
    setSelectedTags([]);
  };
  const removeSelectedTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
  };
  const addSelectedTags = (tag) => {
    setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  let filteredTodos = data;

  if (tagsToShow.length > 0) {
    filteredTodos = data.filter((todo) =>
      todo.selectedTags.some((tag) =>
        tagsToShow.some((selectedTag) => selectedTag.id === tag.id)
      )
    );
  }

  let content;
  if (data && data.length === 0) {
    content = (
      <>
        <div className="flex justify-center w-full">
          <img
            className="w-[45rem] bg-center object-cover"
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?ga=GA1.1.295908696.1722924150&semt=sph"
            alt="empty-todolist-img"
          />
        </div>
        <h3 className="text-center text-2xl">
          It seems you don't have anything to do
        </h3>
      </>
    );
  } else if (isLoading) {
    content = <Skeleton className="mt-5 w-full h-16" times={4} />;
  } else if (error) {
    content = <div>Error displaying todos</div>;
  } else {
    content = (
      <div className="flex flex-wrap mt-10 gap-10">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleOpenTodoEdit={handleOpenTodoEdit}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-10  px-10 py-5">
      <SideBar
        tagValue={tagValue}
        handleChange={handleTagChange}
        toggleBox={isTagBoxOpen}
        handleClick={handleTagBoxOpen}
        selectedColor={selectedColor}
        onChange={onColorChange}
        tagTitle={tagTitle}
        titleOnChange={handleTagTitleUpdate}
        resetTagForm={resetTagForm}
        handleDivClick={handleDivClick}
        tagsToShow={tagsToShow}
      />
      <div className="w-full ">
        <div className="flex justify-between items-center">
          <input
            value={todoValue}
            onChange={handleTodoChange}
            type="text"
            placeholder="Search for todo's"
            className="outline-none w-96 placeholder:text-gray-600"
          />

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
              title={todoTitle}
              titleOnChange={handleTodoTitleUpdate}
              description={todoDescription}
              descriptionOnChange={handleTodoDescriptionUpdate}
              resetTodoForm={resetTodoForm}
              selectedTags={selectedTags}
              isEdit={isEdit}
              clear={clearSelectedTags}
              remove={removeSelectedTag}
              add={addSelectedTags}
              todo={todos}
            />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export default DisplayPage;
