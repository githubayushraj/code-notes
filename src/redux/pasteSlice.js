import { createSlice } from '@reduxjs/toolkit';

export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    value: localStorage.getItem('paste')
      ? JSON.parse(localStorage.getItem('paste')) 
      : []
  },
  reducers: {
    createCode: (state, action) => {
      state.value.push(action.payload);
    },
    updateCode: (state, action) => {
      const { id, newText } = action.payload;
      const index = state.value.findIndex((code) => code.id === id);
      if (index !== -1) {
        state.value[index].text = newText;
      }
    },
    resetCode: (state) => {
      state.value = [];
    },
    removeCode: (state, action) => {
      state.value = state.value.filter((code) => code.id !== action.payload);
    },
  }
});

export const { createCode, updateCode, resetCode, removeCode } = pasteSlice.actions;
export default pasteSlice.reducer;
