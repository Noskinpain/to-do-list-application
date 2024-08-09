import React from "react";
import ColorPicker from "./ColorPicker";
import { useAddTagMutation,} from "../store";

const CreateTagModal = ({
  toggleBox,
  handleClick,
  selectedColor,
  onChange,
  title,
  titleOnChange,
  resetTagForm
}) => {
    const [addTag] = useAddTagMutation()
  
const handleSubmit = (e) => {
    e.preventDefault()
    addTag({name:title, color:selectedColor})
    resetTagForm()
    handleClick()
}
    
  return (
    <>
      {toggleBox && (
        <div
          onClick={handleClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[35rem] h-fit py-10 bg-white rounded-xl px-5"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between ">
                <p
                  onClick={handleClick}
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
              <h1 className="mt-8 text-xl">Colors</h1>
              <ColorPicker
                selectedColor={selectedColor}
                onColorChange={onChange}
              />
            </form>
            {/* tag list will show here with their color selections */}
          
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTagModal;
