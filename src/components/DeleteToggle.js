const DeleteToggle = ({ isDeleteBoxOpen, handleClick , boxRef}) => {
  return (
    <>
      {isDeleteBoxOpen && (
        <div ref={boxRef} className="w-28 absolute h-fit py-3 shadow-xl mt-2 border">
          <p className="hover:bg-gray-200 cursor-pointer px-2">Delete</p>
          <p className="hover:bg-gray-200 cursor-pointer px-2">Delete Done</p>
        </div>
      )}
    </>
  );
};

export default DeleteToggle;
