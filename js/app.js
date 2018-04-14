const img = document.querySelector('img');
let tickles = 0;

img.addEventListener('click', () => {
	tickles += 1;
	const counter = document.querySelector('.fa-layers-counter');
	counter.innerText = tickles;
});