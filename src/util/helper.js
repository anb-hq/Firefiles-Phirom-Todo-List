const removeSpaces = (str) => {
	return str
		.split(' ')
		.filter((s) => s)
		.join(' ');
};
