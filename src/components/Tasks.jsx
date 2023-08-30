import { useTaskStore } from '../state/taskStore';

const Tasks = () => {
	const { tasks, onDeleteTask } = useTaskStore((state) => ({
		tasks: state.tasks,
		onDeleteTask: state.handleDeleteTask,
	}));

	const handleClickDeleteTask = (taskId) => {
		onDeleteTask(taskId);
	};

	return (
		<>
			<ul>
				{tasks.map((task) => (
					<li id={task.id}>
						<span>{task.description}</span>{' '}
						<span
							onClick={() => {
								handleClickDeleteTask(task.id);
							}}
						>
							<i className="ti ti-circle-x"></i>
						</span>
					</li>
				))}
			</ul>
		</>
	);
};

export { Tasks };
