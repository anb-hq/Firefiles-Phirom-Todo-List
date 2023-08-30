import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware';

const taskStore = (set) => ({
	tasks: [],
	handleAddTask: (task) => {
		set((state) => ({
			tasks: [task, ...state.tasks],
		}));
	},
	handleDeleteTask: (taskId) => {
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== taskId),
		}));
	},
	handleToggleTaskStatus: (taskId) => {
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
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
