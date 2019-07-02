const { render } = wp.element;

import Map from './components/Map';

const domElements = document.querySelector( '.fl-google-map' );
console.log( 'domElements', domElements );
console.log( 'domElements.dataset.apikey', domElements.dataset.apikey );
render(
	<Map
		isMarkerShown
		// googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDF2iOeB7ov5284lj6Sw74b0sd9qLY8Dys&v=3.exp&libraries=geometry,drawing,places"
		googleMapURL="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"
		loadingElement={<div style={{ height: '100%' }} />}
		containerElement={<div style={{ height: '400px' }} />}
		mapElement={<div style={{ height: '100%' }} />}
	/>,
	domElements
);
