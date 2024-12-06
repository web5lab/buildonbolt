import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  items:null,
  selectedCategory: null,
  isExpanded: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setSelectedCategory, toggleExpanded, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;