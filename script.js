const sidebarBtns = document.querySelectorAll('.side-btn');
const nav = document.querySelector('.nav');
const wrapper = document.querySelector('.wrapper');
sidebarBtns.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		nav.style.transform = `translateY(${index * 10.7}rem)`;
		wrapper.style.transform = `translateY(-${index * 20}%`;
	});
});

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

	time.textContent = day + ' ' + (h < 10? '0' + h: h) + ':' + (m < 10? '0' + m: m) + ':' + (s < 10? '0' + s: s);
}

setInterval(getTime, 500);
