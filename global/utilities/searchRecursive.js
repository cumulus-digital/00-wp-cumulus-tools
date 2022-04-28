/**
 * Recursively test a collection
 * @param {object} collection Collection of objects to test
 * @param {function} test Check function
 * @param {string} inspect Key to trigger recursion
 */
const searchRecursive = ( collection, test, inspect ) => {
	for ( const i in collection ) {
		if ( test( collection[ i ] ) ) {
			return true;
		}
		return (
			Array.isArray( collection[ i ]?.[ inspect ] ) &&
			searchRecursive( collection[ i ][ inspect ], test, inspect )
		);
	}
	return false;
};
export default searchRecursive;
