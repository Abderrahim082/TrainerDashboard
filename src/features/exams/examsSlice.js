// src/features/exams/examsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const examsSlice = createSlice({
  name: 'exams',
  initialState: {
    list: [
      {
        id: 1,
        name: "newQuiz",
        description: "description",
        module: "competences5",
        date: "2023-09-19",
        time: "15:21",
        status: true,
      },
    ],
    newExam: {
      name: '',
      module: '',
      competence: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
    },
  },
  reducers: {
    updateNewExam: (state, action) => {
      state.newExam = { ...state.newExam, ...action.payload };
    },
    addExam: (state) => {
      const newExam = {
        ...state.newExam,
        id: state.list.length + 1,
        description: 'description',
        status: true,
      };
      state.list.push(newExam);
      state.newExam = {
        name: '',
        module: '',
        competence: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
      };
    },
    deleteExam: (state, action) => {
      state.list = state.list.filter(exam => exam.id !== action.payload);
    },
    updateExam: (state, action) => {
      const index = state.list.findIndex(exam => exam.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
  },
});

export const { updateNewExam, addExam, deleteExam, updateExam } = examsSlice.actions;
export default examsSlice.reducer;