import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useDeleteTodoMutation } from "../store";

const Todo = ({ todo, handleOpenTodoEdit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleInput, setToggleInput] = useState(false);

  const dialogRef = useRef(null);

  //
  const handleDeleteTodo = (todo) => {
    deleteTodo(todo.id);
  };

  const handleToggleInput = (todo) => {
    setToggleInput(!toggleInput);
  };

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setIsDialogOpen(false);
    }
  };

  const handleEditFunctions = () => {
    handleOpenTodoEdit(todo);
  };

  useEffect(() => {
    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogOpen]);
  const tags = todo.selectedTags.map((tag) => {
    return (
      <div
        key={tag.id}
        className="w-7 h-7 rounded-full opacity-60"
        style={{ backgroundColor: tag.color }}
      ></div>
    );
  });
  const createdAt = new Date(todo.createdAt);
  const formattedDate = createdAt.toLocaleDateString();
  const formattedTime = createdAt.toLocaleTimeString();
  return (
    <div className={`${toggleInput? "opacity-40" : "opacity-100"} w-[30rem] bg-[#FFF9DE] text-gray-700 px-3 py-4`}>
      <div className="flex justify-between items-center flex-row">
        <p className={`${toggleInput? "line-through" : ""} font-bold text-lg capitalize`}>{todo.title}</p>
        <div>
          <BsThreeDots
            className="text-lg cursor-pointer"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          />
          {isDialogOpen ? (
            <div
              ref={dialogRef}
              className="absolute w-16 h-fit py-2 shadow-lg bg-white pl-2"
            >
              <p className="cursor-pointer" onClick={handleEditFunctions}>
                Edit
              </p>
              <p
                className="mt-1 cursor-pointer"
                onClick={() => handleDeleteTodo(todo)}
              >
                Delete
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-[11px]">
        {formattedDate} - {formattedTime}
      </p>
      <p className={` ${toggleInput ? "line-through" : ""} text-[15px] font-[600]`}>{todo.description}</p>
      <div className="flex justify-between items-center flex-row pt-10">
        <div className="flex items-center gap-1">{tags}</div>

        <div className="flex gap-1">
          <input type="checkbox" className="cursor-pointer" onClick={() => handleToggleInput(todo)}/>
          <p className="text-sm">Done</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
