// src/features/courses/coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    newCourse: {
      title: '',
      pdfFile: null,
      videoUrl: '',
      posterImage: null,
      module: '',
      competence: '',
    },
  },
  reducers: {
    updateNewCourse: (state, action) => {
      state.newCourse = { ...state.newCourse, ...action.payload };
    },
    addCourse: (state) => {
      state.list.push({ ...state.newCourse, id: state.list.length + 1 });
      state.newCourse = {
        title: '',
        pdfFile: null,
        videoUrl: '',
        posterImage: null,
        module: '',
        competence: '',
      };
    },
    deleteCourse: (state, action) => {
      state.list = state.list.filter(course => course.id !== action.payload);
    },
  },
});

export const { updateNewCourse, addCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;