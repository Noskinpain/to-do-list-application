import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tags",
  initialState: {
   tags: [],
   tagsSearchValue: "",
   isCreateTagBoxOpen: false,
   selectedColor: "",
   tagTitle: ""
  },
  reducers: {
    updateTagValue(state, action){
      state.tagsSearchValue = action.payload
      },
    toggleTagBox(state){
      state.isCreateTagBoxOpen = !state.isCreateTagBoxOpen
    },
    setSelectedColor(state, action){
     state.selectedColor = action.payload
    },
    UpdateTagTitle(state, action){
    state.tagTitle = action.payload
    },
    resetTag(state){
      state.tagTitle = ""
      state.selectedColor = ""
    }
  }
});

export const {updateTagValue, toggleTagBox, setSelectedColor, UpdateTagTitle, resetTag} = tagSlice.actions
export const tagReducer = tagSlice.reducer;
