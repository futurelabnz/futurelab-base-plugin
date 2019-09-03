/*
 * @Author: Hank
 * @Date: 2019-05-10 09:09:40
 * @Last Modified by: Hank
 * @Last Modified time: 2019-09-03 13:26:36
 */

( function() {
	'use strict';

	try {
		const btnScrollDown = document.querySelector( '.scrolldown-arrow' );
		const slider = document.querySelector(
			'.wp-block-futurelab-block-fl-block-slider2'
		);

		// check if element exist
		if ( typeof slider !== 'undefined' && slider !== null ) {
			const scrollDownHeight = slider.clientHeight;
			function scrollDown() {
				( function scroll() {
					// window.scrollTo desnot support IE
					window.scrollTo( {
						top: scrollDownHeight - 125,
						left: 0,
						behavior: 'smooth',
					} );
				}() );
			}
			btnScrollDown.addEventListener( 'click', scrollDown );
		}
	} catch ( error ) {
		// console.log( 'slider frontend.js error', error );
	}
}() );
