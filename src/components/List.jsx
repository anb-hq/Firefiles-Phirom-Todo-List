import { useRef, useEffect, useState } from 'react';

import { useTaskStore } from '../state/taskStore';

import '../style/index.css';

import '../style/reset.css';

import '../style/List.css'

const List = ({ task, checkIconColor }) => {
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
		<li
			className={`task-item ${task.completed ? 'completed' : ''}`}
			key={task.id}
		>
			{editingTaskId === task.id ? (
				<>
					<span onClick={() => handleToggleTaskStatus(task.id)}>
						<i
							className={`ti ti-circle${
								task.completed ? '-check' : ''
							} ${checkIconColor}`}
						></i>
					</span>
					<input
						className={`task-item__edit-form ${
							task.completed ? 'font--gray' : 'font--light-gray'
						}`}
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
					<span
						onClick={() => {
							handleDeleteTask(task.id);
						}}
					>
						<i className="ti ti-circle-x icon--red task-item__delete"></i>
					</span>
				</>
			) : (
				<>
					{/* <div> */}
					<span onClick={() => handleToggleTaskStatus(task.id)}>
						<i
							className={`ti ti-circle${
								task.completed ? '-check' : ''
							} ${checkIconColor}`}
						></i>
					</span>
					<span
						className={`task-item__description ${
							task.completed ? 'font--gray' : 'font--light-gray'
						}`}
						onClick={() => {
							handleStartEdit(task.id, task.description);
						}}
					>
						{task.description}
					</span>
					{/* </div> */}
					<span
						onClick={() => {
							handleDeleteTask(task.id);
						}}
					>
						<i className="ti ti-circle-x icon--red task-item__delete"></i>
					</span>
				</>
			)}
		</li>
	);
};

export { List };
