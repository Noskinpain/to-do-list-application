import { useFetchTagsQuery } from "../store";
import Skeleton from "./Skeleton";
import { useAddTodoMutation } from "../store";
import { useState } from "react";

const CreateTodoModal = ({
  isBoxOpen,
  handleToogle,
  title,
  titleOnChange,
  description,
  descriptionOnChange,
  resetTodoForm
}) => {
  const { data, isLoading, error } = useFetchTagsQuery();
  const [selectedTags, setSelectedTags] = useState([])
  const [addTodo] = useAddTodoMutation()



  const tagIds = selectedTags.map(tag => tag.id);
  const handleAddTodo = (e) => {
    e.preventDefault()
    addTodo({title, description, selectedTags})
    resetTodoForm()
    handleToogle()
  }

  const handleTagSelection = (tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  }
  let content;
  if(isLoading){
    content = <Skeleton className="w-full h-5" times={1} />
  }
  else if(error){
    content = <div>Error showing tags</div>
  }
  else{
    content = data.map((tag) => {
      return <div key={tag.id} className="flex gap-1 items-center" onClick = {() => handleTagSelection(tag)}>
        <div
        className="w-4 h-4 rounded-full opacity-60"
        style={{ backgroundColor: tag.color }}
      ></div>
        <p>{tag.name}</p>
      </div>
    })
  }

  return (
    <>
      {isBoxOpen && (
        <div
          onClick={handleToogle}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[35rem] h-fit py-5 bg-white rounded-xl px-5"
          >
            <form onSubmit={handleAddTodo}>
            <div className="flex justify-between ">
              <p
                onClick={handleToogle}
                className="text-gray-500 cursor-pointer"
              >
                Exit
              </p>
              <button className="bg-slate-800 text-white w-20 h-7 rounded-lg">
                Add
              </button>
            </div>
            <h1 className="mt-4 text-xl">Title</h1>
            
            <input
              type="text"
              value={title}
              onChange={titleOnChange}
              placeholder="add a title..."
              className="w-full px-3 mt-2 h-8 rounded-lg outline-none bg-gray-100"
            />
           
            <h1 className="mt-8 text-xl">Description</h1>
            <textarea
              type="text"
              value={description}
              onChange={descriptionOnChange}
              placeholder="add a discription..."
              className="w-full px-3 mt-2 h-24 pt-1 rounded-lg outline-none bg-gray-100"
            />

            <div className="flex justify-between mt-3">
              <h1>Tags</h1>
              <input
                type="text"
                placeholder="search your tag"
                className="h-8 w-48 outline-none"
              />
            </div>
            {/* tag list will show here with their color selections */}
            <div className="flex gap-4 mt-2">
            {content}
            </div>
            </form>
          </div>
          
        </div>
      )}
    </>
  );
};

export default CreateTodoModal;
