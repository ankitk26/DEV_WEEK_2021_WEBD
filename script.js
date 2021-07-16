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

playBtn.addEventListener('click', () => {
	playBtn.classList.remove('current-btn');
	pauseBtn.classList.add('current-btn');
});

pauseBtn.addEventListener('click', () => {
	playBtn.classList.add('current-btn');
	pauseBtn.classList.remove('current-btn');
});
