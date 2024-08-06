

const CreateTodoModal = ({isBoxOpen, handleToogle}) => {
  return (
    <>
      {isBoxOpen && (
        <div
          onClick={handleToogle}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[35rem] h-[25rem] bg-white rounded-xl px-5 pt-5"
          >
            <div className="flex justify-between ">
                <p onClick={handleToogle} className="text-gray-500 cursor-pointer">Exit</p>
                <button className="bg-slate-800 text-white w-20 h-7 rounded-lg">Add</button>
            </div>
            <h1 className="mt-4 text-xl">Title</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTodoModal;
