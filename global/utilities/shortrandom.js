/**
 * Generate short, relatvely random IDs
 */

/**
 * Generate an ID and ensure no other element has it
 * @param {prefix,attributes} opts
 */
export const generateId = ( opts ) => {
	const options = Object.assign(
		{
			prefix: '',
			attributes: {},
			setAttributes: () => {},
			attribute: 'bodyId',
		},
		opts
	);
	if (
		! options.attributes?.bodyId ||
		( options.attributes.bodyId &&
			window.document.querySelectorAll(
				`[data-anchor="${ options.attributes.bodyId }"],#${ options.attributes.bodyId }`
			)?.length > 1 )
	) {
		let anchor = shortRandom( options.prefix );
		while (
			window.document.querySelector(
				`[data-anchor="${ anchor }],#${ anchor }`
			)
		) {
			anchor = shortRandom( options.prefix );
		}
		options.setAttributes( { [ options.attribute ]: anchor } );
	}
	return options.attributes.bodyId;
};
/**
 *
 * @param {string} prefix
 * @returns
 */
export const shortRandom = ( prefix = '' ) => {
	return (
		prefix +
		[ ...Array( 12 ) ]
			.map( () => Math.random().toString( 32 )[ 2 ] )
			.join( '' )
	);
};
