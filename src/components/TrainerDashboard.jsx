import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNewCourse, addCourse } from '../features/courses/coursesSlice';
import { updateNewExam, addExam } from '../features/exams/examsSlice';
import { PlusIcon, TrashIcon, PencilIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const TrainerDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const dispatch = useDispatch();
  const { newCourse } = useSelector((state) => state.courses);
  const { list: exams, newExam } = useSelector((state) => state.exams);

  const handleCreateCourse = () => {
    dispatch(addCourse());
  };

  const handleAddExam = () => {
    dispatch(addExam());
    setShowAddExamModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === 'courses'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'exams'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('exams')}
          >
            Exams
          </button>
        </div>
      </div>

      {activeTab === 'courses' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={newCourse.title}
              onChange={(e) => dispatch(updateNewCourse({ title: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdf">
              PDF File
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pdf"
              type="file"
              accept=".pdf"
              onChange={(e) => dispatch(updateNewCourse({ pdfFile: e.target.files?.[0] || null }))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
              Video URL (Optional)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="video"
              type="text"
              value={newCourse.videoUrl}
              onChange={(e) => dispatch(updateNewCourse({ videoUrl: e.target.value }))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="poster">
              Poster Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="poster"
              type="file"
              accept="image/*"
              onChange={(e) => dispatch(updateNewCourse({ posterImage: e.target.files?.[0] || null }))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="module">
              Module
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="module"
              value={newCourse.module}
              onChange={(e) => dispatch(updateNewCourse({ module: e.target.value }))}
            >
              <option value="">Select module</option>
              <option value="module1">Module 1</option>
              <option value="module2">Module 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="competence">
              Competence
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="competence"
              value={newCourse.competence}
              onChange={(e) => dispatch(updateNewCourse({ competence: e.target.value }))}
            >
              <option value="">Select competence</option>
              <option value="comp1">Competence 1</option>
              <option value="comp2">Competence 2</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreateCourse}
          >
            Create Course
          </button>
        </div>
      )}

      {activeTab === 'exams' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Exams</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              onClick={() => setShowAddExamModal(true)}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Exam
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Quiz Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Module</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {exams.map((exam) => (
                <tr key={exam.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{exam.name}</td>
                  <td className="py-3 px-6 text-left">{exam.description}</td>
                  <td className="py-3 px-6 text-left">{exam.module}</td>
                  <td className="py-3 px-6 text-left">{exam.date}</td>
                  <td className="py-3 px-6 text-left">{exam.time}</td>
                  <td className="py-3 px-6 text-left">{exam.status ? "✓" : "✗"}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <DocumentTextIcon className="w-4 h-4" />
                      </button>
                      <button className="text-green-500 hover:text-green-700">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddExamModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add Exam</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-4"
                  placeholder="Quiz Name"
                  value={newExam.name}
                  onChange={(e) => dispatch(updateNewExam({ name: e.target.value }))}
                />
                <select
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-4"
                  value={newExam.module}
                  onChange={(e) => dispatch(updateNewExam({ module: e.target.value }))}
                >
                  <option value="">Select module</option>
                  <option value="module1">Module 1</option>
                  <option value="module2">Module 2</option>
                </select>
                <div className="flex items-center mb-4">
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    value={newExam.date}
                    onChange={(e) => dispatch(updateNewExam({ date: e.target.value }))}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="time"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    value={newExam.time}
                    onChange={(e) => dispatch(updateNewExam({ time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleAddExam}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;