/* eslint-disable no-console */
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

export default withScriptjs(
	withGoogleMap( props => {
		console.log( 'props', props );
		return (
			<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
				{props.isMarkerShown && (
					<Marker position={{ lat: -34.397, lng: 150.644 }} />
				)}
			</GoogleMap>
		);
	} )
);
