import { useState } from 'react';

import { useTaskStore } from '../state/taskStore';

import { removeSpaces } from '../util/helper';

import '../style/InputForm.css'

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
			<form className='add-task-form' onSubmit={(e) => handleTaskSubmit(e)}>
				<input
					className='font--dark-gray'
					placeholder='New task...'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className='input-btn'>
					<i className="ti ti-plus font--light-gray"></i>
				</button>
			</form>
		</>
	);
};

export { InputForm };
