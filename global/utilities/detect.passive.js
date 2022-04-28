/**
 * Detect if the broowser supports passive event listeners
 */
var supportsPassive = false;
try {
	var opts = Object.defineProperty( {}, 'passive', {
		get: function () {
			supportsPassive = true;
		},
	} );
	window.addEventListener( 'testPassive', null, opts );
	window.removeEventListener( 'testPassive', null, opts );
} catch ( e ) {}

export default () => {
	return supportsPassive;
};
