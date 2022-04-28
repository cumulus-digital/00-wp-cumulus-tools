/**
 * Helper to determine if a value of unknown type is truthy
 */
export default ( val = null ) => {
	return JSON.parse( val );
};
