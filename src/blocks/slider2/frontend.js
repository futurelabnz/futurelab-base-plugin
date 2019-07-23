/*
 * @Author: Hank
 * @Date: 2019-05-10 09:09:40
 * @Last Modified by: Hank
 * @Last Modified time: 2019-07-23 13:45:10
 */

( function() {
	'use strict';

	try {
		const btnScrollDown = document.querySelector( '.scrolldown-arrow' );
		const scrollDownHeight = document.querySelector(
			'.wp-block-futurelab-block-fl-block-slider2'
		).clientHeight;

		function scrollDown() {
			( function scroll() {
				// window.scrollTo desnot support IE
				window.scrollTo( {
					top: scrollDownHeight - 125,
					left: 0,
					behavior: 'smooth',
				} );
				// window.scrollTo( 0, 500 );
				// if ( window.pageYOffset < scrollDownHeight ) {
				// 	window.scrollBy( 0, 10 );
				// 	setTimeout( scroll, 0 );
				// }
				// if ( window.pageYOffset > scrollDownHeight ) {
				// 	window.scrollTo( 0, 525 );
				// }
			}() );
		}
		btnScrollDown.addEventListener( 'click', scrollDown );
	} catch ( error ) {
		// console.log( 'slider frontend.js error', error );
	}
}() );
