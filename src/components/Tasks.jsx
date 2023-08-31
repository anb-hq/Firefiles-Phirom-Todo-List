import { useTaskStore } from '../state/taskStore';

import { List } from './List';

const Tasks = () => {
	const tasks = useTaskStore((state) => state.tasks);

	return (
		<>
			<h3 className="font--gray">Pending</h3>
			<ul>
				{tasks
					.filter((task) => !task.completed)
					.map((task) => (
						<List key={task.id} task={task} checkIconColor="icon--cool-gray" />
					))}
			</ul>
			<h3 className="font--gray">Completed</h3>
			<ul>
				{tasks
					.filter((task) => task.completed)
					.map((task) => (
						<List key={task.id} task={task} checkIconColor="icon--gray" />
					))}
			</ul>
		</>
	);
};

export { Tasks };
