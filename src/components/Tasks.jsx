import { useTaskStore } from '../state/taskStore';

import { List } from './List';

const Tasks = () => {
	const tasks = useTaskStore((state) => state.tasks);

	return (
		<>
			<h3>Pending</h3>
			<ul>
				{tasks
					.filter((task) => !task.completed)
					.map((task) => (
						<List task={task} />
					))}
			</ul>
			<h3>Completed</h3>
			<ul>
				{tasks
					.filter((task) => task.completed)
					.map((task) => (
						<List task={task} />
					))}
			</ul>
		</>
	);
};

export { Tasks };
