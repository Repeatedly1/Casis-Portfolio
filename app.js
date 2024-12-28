const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');
const audio = document.getElementById('background-music');
const playPauseButton = document.getElementById('play-pause-button');
const progressBar = document.getElementById('progress-bar');
const progressThumb = document.getElementById('progress-thumb');
document.getElementById('background-music').volume = 1.0;
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

let isPlaying = false;

playPauseButton.addEventListener('click', () => {
	if (isPlaying) {
		audio.pause();
		playPauseButton.textContent = '▷';
	} else {
		audio.play();
		playPauseButton.textContent = '||';
	}
	isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressThumb.style.left = `calc(${progress}% - 7.5px)`; // Center the thumb
});

let isDragging = false;

progressThumb.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const totalWidth = rect.width;
        const percentage = Math.min(Math.max(offsetX / totalWidth, 0), 1); // Clamp between 0 and 1
        const newTime = percentage * audio.duration;
        audio.currentTime = newTime;
        progressThumb.style.left = `calc(${percentage * 100}% - 7.5px)`; // Center the thumb
    }
});

progressBar.addEventListener('click', (event) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const totalWidth = rect.width;
    const percentage = Math.min(Math.max(offsetX / totalWidth, 0), 1); // Clamp between 0 and 1
    audio.currentTime = percentage * audio.duration;
    progressThumb.style.left = `calc(${percentage * 100}% - 7.5px)`; // Center the thumb
});
