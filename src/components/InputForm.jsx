import { useState } from 'react';

import { useTaskStore } from '../state/taskStore';

import { removeSpaces } from '../util/helper';

const InputForm = () => {
	return <AddTaskForm />;
};

const AddTaskForm = () => {
	const onAddTask = useTaskStore((state) => state.addTask);

	const [description, setDescription] = useState('');

	const handleTaskSubmit = (e) => {
		e.preventDefault();

		if (!removeSpaces(description)) return;

		onAddTask({
			id: Date.now(),
			description: removeSpaces(description),
			completed: false,
		});

		setDescription('');
	};

	return (
		<>
			<form onSubmit={(e) => handleTaskSubmit(e)}>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button>
					<i className="ti ti-plus"></i>
				</button>
			</form>
		</>
	);
};

export { InputForm };
