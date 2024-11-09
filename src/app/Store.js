// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import examsReducer from '../features/exams/examsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    exams: examsReducer,
  },
});