import { useDeleteAllTodosMutation } from "../store";

const DeleteToggle = ({ isDeleteBoxOpen, boxRef }) => {
  const [deleteAllTodos, { isLoading, isError, isSuccess }] =
    useDeleteAllTodosMutation();

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all todos?"
    );
    if (confirmed) {
      try {
        await deleteAllTodos();
        console.log("All todos deleted");
      } catch (error) {
        console.error("Failed to delete todos:", error);
      }
    }
  };
  return (
    <>
      {isDeleteBoxOpen && (
        <div
          ref={boxRef}
          className="w-28 absolute h-fit py-3 shadow-xl mt-2 border bg-white"
        >
          <p
            className="hover:bg-gray-200 cursor-pointer px-2 py-1"
            onClick={handleDeleteAll}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete all"}
          </p>
          <p className="hover:bg-gray-200 cursor-pointer px-2 py-1">
            Delete done
          </p>
        </div>
      )}
    </>
  );
};

export default DeleteToggle;
