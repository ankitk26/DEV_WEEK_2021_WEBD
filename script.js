// sidebar

const sidebarBtns = document.querySelectorAll('.side-btn');
const nav = document.querySelector('.nav');
const wrapper = document.querySelector('.wrapper');
sidebarBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		nav.style.transform = `translateY(${index * 10.7}rem)`;
		wrapper.style.transform = `translateY(-${index * 20}%`;
	});
});

// mapbox

mapboxgl.accessToken =
	'pk.eyJ1IjoicHNldWRvYm90IiwiYSI6ImNrcjBlajloMDFyMWsycHFwYjhueXVkb3QifQ.ZGVjk7dzAa74UqAmbKQgsQ';
let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [85, 22.5],
	zoom: 6,
});

map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		trackUserLocation: true,
	}),
	'top-left'
);

map.addControl(
	new MapboxDirections({
		accessToken: mapboxgl.accessToken,
	}),
	'top-right'
);

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// display time

let time = document.querySelector('.time');

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getTime() {
	let d = new Date();
	let m = d.getMinutes();
	let h = d.getHours();
	let s = d.getSeconds();
	let day = days[d.getDay()];

	time.textContent =
		day +
		' ' +
		(h < 10 ? '0' + h : h) +
		':' +
		(m < 10 ? '0' + m : m) +
		':' +
		(s < 10 ? '0' + s : s);
}

setInterval(getTime, 500);

// speed animation

let speed = document.querySelector('.speed-num');

let speedVal = 0;
let animationTime = 100;

let speedAnimation = () => {
	animationTime -= 0.5;
	speed.textContent = speedVal;
	speedVal++;
	if (speedVal == 262) {
		let speedInfo = document.querySelector('.speed-info');
		speedInfo.textContent = `Max Speed`;
		speedInfo.classList.remove('speed-flicker');
		return;
	}
	setTimeout(speedAnimation, animationTime);
};

setTimeout(speedAnimation, animationTime);

// Music player

let playBtn = document.querySelector('.play-btn');
let pauseBtn = document.querySelector('.pause-btn');
let imageRotate = document.querySelectorAll('.song-img');
let audio = document.querySelector('audio');

let musicNames = [];
let musicQueue = [];
let currentPlaying = 0;

playBtn.addEventListener('click', () => {
	if (musicQueue.length === 0) return;
	playBtn.classList.remove('current-btn');
	pauseBtn.classList.add('current-btn');
	imageRotate.forEach((element) => element.classList.remove('img-rotate'));
	audio.play();
});

pauseBtn.addEventListener('click', () => {
	if (musicQueue.length === 0) return;
	playBtn.classList.add('current-btn');
	pauseBtn.classList.remove('current-btn');
	imageRotate.forEach((element) => element.classList.add('img-rotate'));
	audio.pause();
});

let addFiles = document.querySelector('.add-file');
let musicInput = document.querySelector('#music-input');
let musicList = document.querySelector('.song-list');

addFiles.addEventListener('click', () => musicInput.click());

musicInput.addEventListener('change', () => {
	let inputfiles = musicInput.files;
	for (let i = 0; i < inputfiles.length; i++)
		musicNames.push(inputfiles[i].name);
	updateList();
});

function updateList() {
	musicNames.forEach((song, index) => {
		let div = document.createElement('div');
		div.textContent = `${index + 1}.\t${song}`;
		div.setAttribute('class', 'songs');
		musicList.appendChild(div);
	});

	musicQueue = document.querySelectorAll('.songs');
	audio.setAttribute('src', `media/${musicNames[0]}`);

	musicQueue.forEach((music, index) => {
		music.addEventListener('click', () => {
			currentPlaying = index;
			audio.setAttribute('src', `media/${musicNames[index]}`);
			audio.play();
			playBtn.click();
		});
	});
}

let next = document.querySelector('.next-btn');
let prev = document.querySelector('.prev-btn');

next.addEventListener('click', () => {
	if (musicQueue.length === 0) return;
	if (currentPlaying + 1 > musicQueue.length) currentPlaying = 0;
	else currentPlaying++;
	musicQueue[currentPlaying].click();
});

prev.addEventListener('click', () => {
	if (musicQueue.length === 0) return;
	if (currentPlaying - 1 < 0) currentPlaying = musicQueue.length;
	else currentPlaying--;
	musicQueue[currentPlaying].click();
});
