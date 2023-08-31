import { useTaskStore } from '../state/taskStore';

const Tasks = () => {
	const { tasks, onDeleteTask, onToggleTaskStatus } = useTaskStore((state) => ({
		tasks: state.tasks,
		onDeleteTask: state.deleteTask,
		onToggleTaskStatus: state.toggleTaskStatus,
	}));

	const handleDeleteTask = (taskId) => {
		onDeleteTask(taskId);
	};

	const handleToggleTaskStatus = (taskId) => {
		onToggleTaskStatus(taskId);
	};

	return (
		<>
			<ul>
				{tasks.map((task) => (
					<li key={task.id}>
						<span>
							<i
								className={`ti ti-circle${task.completed ? '-check' : ''}`}
								onClick={() => handleToggleTaskStatus(task.id)}
							></i>
						</span>
						<span>{task.description}</span>{' '}
						<span
							onClick={() => {
								handleDeleteTask(task.id);
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
