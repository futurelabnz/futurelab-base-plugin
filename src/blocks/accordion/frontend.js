/*
 * @Author: Hank
 * @Date: 2019-08-23 15:36:23
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-26 10:22:23
 */

( function() {
	'use strict';

	const acc = document.getElementsByClassName( 'accordion' );

	// check if acc element exists
	if ( typeof acc !== 'undefined' && acc !== null ) {
		// if exists.
		let i;

		for ( i = 0; i < acc.length; i++ ) {
			acc[ i ].addEventListener( 'click', function() {
				/* Toggle between adding and removing the "active" class,
			to highlight the button that controls the panel */
				this.classList.toggle( 'active' );

				/* Toggle between hiding and showing the active panel */
				const panel = this.nextElementSibling;
				if ( panel.style.display === 'block' ) {
					panel.style.display = 'none';
				} else {
					panel.style.display = 'block';
				}
			} );
		}
	}
}() );
