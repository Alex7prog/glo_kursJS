// Team photo
const photoTeam = () => {
	const command = document.getElementById('command');

	command.addEventListener('mouseover', event => {
		const target = event.target;

		target.dataset.imgSrcStore = target.src;
		target.src = target.dataset.img;
	});

	command.addEventListener('mouseout', event => {
		const target = event.target;

		target.src = target.dataset.imgSrcStore;
	});
};

export default photoTeam;
