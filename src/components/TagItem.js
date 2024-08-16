import { GoTrash } from "react-icons/go";
import { useDeleteTagsMutation, useFetchTodosQuery } from "../store";


const TagItem = ({ tag, handleDivClick, tagsToShow }) => {
  const [deleteTag] = useDeleteTagsMutation();
  const {data, isLoading, error} = useFetchTodosQuery()
 
  

  const handleDeleteTag = () => {
    deleteTag(tag);
  };

 

  let tagCount
  if (!isLoading && !error && data) {
    // Flatten the selectedTags from all todos
    const allSelectedTags = data.flatMap(todo => todo.selectedTags);
  
    // Filter tags that match the passed-in tag
    const matchingTags = allSelectedTags.filter(selectedTag => selectedTag.id === tag.id);
  
    // Get the length of the matching tags
     tagCount = matchingTags.length;
  
    // console.log(`Tag "${tag.name}" appears ${tagCount} times.`);
  }
 const isClicked = tagsToShow.some((t) => t.id === tag.id)
  return (
    <div onClick={() => handleDivClick(tag)} className={`${isClicked? "bg-[#FFF9DE] h-12 px-2 rounded-lg flex justify-between items-center" : "flex justify-between items-center "} cursor-pointer`}>
      <div className="flex gap-3">
        <div
          className="w-7 h-7 rounded-full opacity-60"
          style={{ backgroundColor: tag.color }}
        ></div>
        <p>{tag.name}</p>
      </div>
      <div className="flex items-center gap-3">
      <p>({tagCount})</p>
      <GoTrash
        onClick={handleDeleteTag}
        className="text-xl text-red-500 cursor-pointer"
      />
      </div>
      
    </div>
  );
};

export default TagItem;
