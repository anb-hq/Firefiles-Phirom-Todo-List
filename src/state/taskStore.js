import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware';

import { removeSpaces } from '../util/helper';

const taskStore = (set) => ({
	tasks: [],
	addTask: (task) => {
		set((state) => ({
			tasks: [task, ...state.tasks],
		}));
	},
	deleteTask: (taskId) => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== taskId),
		}));
	},
	toggleTaskStatus: (taskId) => {
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			),
		}));
	},
	saveEdit: (taskId, newDescription) => {
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId
					? { ...task, description: removeSpaces(newDescription) }
					: task
			),
		}));
	},
});

/* 
  the create function is used to create a store that manages 
  state and exposes actions for updating that state. 

  devtools, persist are Zustand's middleware that give
  the application ability to store state to the local storage
  more...
*/
const useTaskStore = create(
	devtools(
		persist(taskStore, {
			name: 'tasks',
		})
	)
);

export { useTaskStore };
