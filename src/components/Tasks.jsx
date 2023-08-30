import { useTaskStore } from '../state/taskStore';

const Tasks = () => {
	const tasks = useTaskStore((state) => state.tasks);

	return (
		<>
			<ul>
				{tasks.map((task) => (
					<li id={task.id}>{task.description}</li>
				))}
			</ul>
		</>
	);
};

export { Tasks };
