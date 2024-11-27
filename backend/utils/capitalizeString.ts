// Function to capitalize the first letter of each word in a given string.
function capitalizeString(text: string) {
	return text
		.split(' ')
		.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
		.join(' ');
}

export default capitalizeString;
