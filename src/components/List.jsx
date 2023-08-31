import { useRef, useEffect, useState } from 'react';

import { useTaskStore } from '../state/taskStore';

const List = ({ task }) => {
	const { onDeleteTask, onToggleTaskStatus, onSaveEdit } = useTaskStore(
		(state) => ({
			onDeleteTask: state.deleteTask,
			onToggleTaskStatus: state.toggleTaskStatus,
			onSaveEdit: state.saveEdit,
		})
	);

	const [editingTaskId, setEditingTaskId] = useState(null);

	const [editedDescription, setEditedDescription] = useState('');

	const inputRef = useRef(null);

	const handleDeleteTask = (taskId) => {
		onDeleteTask(taskId);
	};

	const handleToggleTaskStatus = (taskId) => {
		onToggleTaskStatus(taskId);
	};

	const handleStartEdit = (taskId, initialDescription) => {
		setEditingTaskId(taskId);
		setEditedDescription(initialDescription);
	};

	const handleSaveEdit = (taskId, newDescription) => {
		onSaveEdit(taskId, newDescription);
		setEditingTaskId(null);
	};

	useEffect(() => {
		if (editingTaskId !== null) {
			inputRef.current.focus();
		}
	}, [editingTaskId]);

	return (
		<li key={task.id}>
			{editingTaskId === task.id ? (
				<input
					value={editedDescription}
					id={task.id}
					ref={inputRef}
					onChange={(e) => {
						setEditedDescription(e.target.value);
					}}
					onBlur={() =>
						handleSaveEdit(
							task.id,
							!editedDescription ? task.description : editedDescription
						)
					}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSaveEdit(
								task.id,
								!editedDescription ? task.description : editedDescription
							);
						}
					}}
				/>
			) : (
				<>
					<span onClick={() => handleToggleTaskStatus(task.id)}>
						<i className={`ti ti-circle${task.completed ? '-check' : ''}`}></i>
					</span>
					<span
						onClick={() => {
							handleStartEdit(task.id, task.description);
						}}
					>
						{task.description}
					</span>
					<span
						onClick={() => {
							handleDeleteTask(task.id);
						}}
					>
						<i className="ti ti-circle-x"></i>
					</span>
				</>
			)}
		</li>
	);
};

export { List };
