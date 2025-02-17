import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    value: localStorage.getItem('paste')
      ? JSON.parse(localStorage.getItem('paste'))
      : []
  },
  reducers: {
    createCode: (state, action) => {
      const data = action.payload; // The new paste data

      // Check if a paste with the same title already exists (ignoring case and extra spaces)
      const dupplicateExist = state.value.some(
        paste => paste.title.trim().toLowerCase() === data.title.trim().toLowerCase()
      );

      if (dupplicateExist) {
        toast("A paste with this title already exists.");
        return;
      }

      // Add the new paste and update localStorage
      state.value.push(data);
      localStorage.setItem("paste", JSON.stringify(state.value));
      toast("Paste created successfully...");
    },

    updateCode: (state, action) => {
      const newData = action.payload;
      const idx = state.value.findIndex((item) => item._id === newData._id);

      if (idx >= 0) {
        state.value[idx] = newData;
        localStorage.setItem("paste", JSON.stringify(state.value));
      }
      else{
        toast("Edit failed!")
      }
    },

    resetCode: (state) => {
      state.value = [];
      localStorage.setItem("paste", JSON.stringify(state.value));
    },

    removeCode: (state, action) => {
      const data = action.payload;
      const idx = state.value.findIndex((item) => item._id.toString() === data._id.toString());

      if (idx >= 0) {
        state.value.splice(idx, 1); // Remove the paste from the array
        localStorage.setItem("paste", JSON.stringify(state.value));
        toast("Paste removed successfully.");
      } else {
        toast("Paste not found");
      }
    },
  }
});

export const { createCode, updateCode, resetCode, removeCode } = pasteSlice.actions;
export default pasteSlice.reducer;
