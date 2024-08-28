import { useFetchTagsQuery } from "../store";
import Skeleton from "./Skeleton";
import { useAddTodoMutation, useUpdateTodoMutation } from "../store";

const CreateTodoModal = ({
  isBoxOpen,
  handleToogle,
  title,
  titleOnChange,
  description,
  descriptionOnChange,
  resetTodoForm,
  selectedTags,
  isEdit,
  clear,
  remove,
  add,
  todo,
}) => {
  const { data, isLoading, error } = useFetchTagsQuery();
  const [updateTodo] =
    useUpdateTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      if (isEdit && todo) {
        await updateTodo({
          id: todo.id, // Passing the ID here
          title,
          description,
          selectedTags,
        }).unwrap();
        console.log('Todo updated successfully');
      } else {
        await addTodo({
          title,
          description,
          selectedTags,
          createdAt: new Date().toISOString(),
        }).unwrap();
        console.log('Todo added successfully');
      }
      
      resetTodoForm();
      handleToogle();
      clear(); // Clear selected tags after submitting
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  const handleTagSelection = (tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      remove(tag);
    } else {
      add(tag);
    }
  };

  let content;
  if (isLoading) {
    content = <Skeleton className="w-full h-5" times={1} />;
  } else if (error) {
    content = <div>Error showing tags</div>;
  } else {
    content = data.map((tag) => {
      const isTagSelected = selectedTags.some((t) => t.id === tag.id);
      return (
        <div
          key={tag.id}
          className="flex gap-1 items-center cursor-pointer w-fit"
          onClick={() => handleTagSelection(tag)}
        >
          <div
            className={`w-7 h-7 rounded-full cursor-pointer ${
              isTagSelected ? "opacity-100" : "bg-gray-300 opacity-30"
            }`}
            style={{ backgroundColor: tag.color }}
          ></div>
          <p>{tag.name}</p>
        </div>
      );
    });
  }

  return (
    <>
      {isBoxOpen && (
        <div
          onClick={handleToogle}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-center z-10"
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
                  {isEdit ? "Edit" : "Add"}
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
                placeholder="add a description..."
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
              <div className="flex gap-4 mt-2 ">{content}</div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTodoModal;
