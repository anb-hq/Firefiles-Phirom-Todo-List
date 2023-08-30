import { useTaskStore } from '../state/taskStore';

const Tasks = () => {
	const { tasks, onDeleteTask, onToggleTaskStatus } = useTaskStore((state) => ({
		tasks: state.tasks,
		onDeleteTask: state.handleDeleteTask,
		onToggleTaskStatus: state.handleToggleTaskStatus,
	}));

	const handleClickDeleteTask = (taskId) => {
		onDeleteTask(taskId);
	};

	const handleToggleStatus = (taskId) => {
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
								onClick={() => handleToggleStatus(task.id)}
							></i>
						</span>
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
