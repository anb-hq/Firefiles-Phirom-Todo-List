import { InputForm } from './components/InputForm';

import { Tasks } from './components/Tasks';

import './style/reset.css';

import './style/index.css';

import './style/App.css';

const App = () => {
	return (
		<div className="app">
			<h1 id='title' className='font--gray'>📝 Minimal Todo</h1>
			<InputForm />
			<Tasks />
		</div>
	);
};

export default App;
