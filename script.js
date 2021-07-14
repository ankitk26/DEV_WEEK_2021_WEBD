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
	center: [78.9629, 22.5],
	zoom: 6,
});

map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		trackUserLocation: true,
	})
);

map.addControl(new mapboxgl.NavigationControl());
