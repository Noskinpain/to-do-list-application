

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
            className="w-[35rem] h-fit py-10 bg-white rounded-xl px-5"
          >
            <div className="flex justify-between ">
                <p onClick={handleToogle} className="text-gray-500 cursor-pointer">Exit</p>
                <button className="bg-slate-800 text-white w-20 h-7 rounded-lg">Add</button>
            </div>
            <h1 className="mt-4 text-xl">Title</h1>
            <input type="text" placeholder="add a title..." className="w-full px-3 mt-2 h-8 rounded-lg outline-none bg-gray-100" />
            <h1 className="mt-8 text-xl">Description</h1>
            <textarea type="text" placeholder="add a discription..." className="w-full px-3 mt-2 h-24 rounded-lg outline-none bg-gray-100" />

            <div className="flex justify-between">
                <h1>Tags</h1>
                <input type="text" placeholder="search your tag" className="h-8 w-48 outline-none" />
            </div>
            {/* tag list will show here with their color selections */}
            
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTodoModal;
