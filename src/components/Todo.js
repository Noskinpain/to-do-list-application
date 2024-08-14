import { BsThreeDots } from "react-icons/bs";

const Todo = ({ todo }) => {
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
    <div className="w-[30rem] bg-[#FFF9DE] text-gray-700 px-3 py-4">
      <div className="flex justify-between items-center flex-row">
        <p className=" font-bold text-lg capitalize">{todo.title}</p>
        <BsThreeDots className="text-lg" />
      </div>
      <p className="text-[11px]">{formattedDate} - {formattedTime}</p>
      <p className="text-[15px] font-[600]">{todo.description}</p>
      <div className="flex justify-between items-center flex-row pt-10">
        <div className="flex items-center gap-1">{tags}</div>

        <div className="flex gap-1">
          <input type="checkbox" className="cursor-pointer" />
          <p className="text-sm">Done</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
