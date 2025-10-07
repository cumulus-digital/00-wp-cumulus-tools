import { deepSignal } from 'deepsignal';
import { sortBy } from 'lodash';
import stateNames from './statenames';
import { effect } from '@preact/signals';
import Loading from './Loading.psx';

const isFiltered = ( type ) => store[ type ] !== 'all';

export const initialState = {
	loading: false,
	error: false,
	status: <Loading />,

	_stations: [],

	state: 'all',
	city: 'all',
	format: 'all',
	query: '',
};
export const store = deepSignal( {
	...initialState,

	get states() {
		if ( ! store._stations.length ) return [];

		let states = {};
		store._stations.forEach( ( station ) => {
			if ( ! stateNames?.[ station.state ] ) {
				console.warn( 'Station found with unknown state', station );
				return;
			}

			states[ station.state ] = {
				abbr: station.state,
				name: stateNames[ station.state ],
				value: station.state,
			};
		} );
		states = sortBy( Object.values( states ), [ 'name' ] );

		return states;
	},

	get cities() {
		if ( ! store._stations.length ) return [];

		let cities = {};
		const isStateFiltered = store.state !== 'all';
		store._stations.forEach( ( station ) => {
			if ( ! isStateFiltered || station.state === store.state ) {
				const cityKey = `${ station.state }|${ station.city }`;
				cities[ cityKey ] = {
					value: cityKey,
					key: cityKey,
					state: station.state,
					name: station.city,
				};
			}
		} );
		cities = sortBy( Object.values( cities ), [ 'name' ] );

		return cities;
	},

	get formats() {
		if ( ! store._stations.length ) return [];

		let formats = {};
		store._stations.forEach( ( station ) => {
			// Show all formats if city or state is not filtered
			if ( ! isFiltered( 'state' ) && ! isFiltered( 'city' ) ) {
				formats[ station.format ] = {
					value: station.format,
					name: station.format,
				};
				return;
			}

			// If a city is selected, only show formats in that city
			if ( isFiltered( 'city' ) ) {
				const cityKey = `${ station.state }|${ station.city }`;
				if ( cityKey === store.city ) {
					formats[ station.format ] = {
						value: station.format,
						name: station.format,
					};
					return;
				}
			}

			// If a state is selected but NOT a city, only show formats in that state
			if ( isFiltered( 'state' ) && station.state === store.state ) {
				formats[ station.format ] = {
					value: station.format,
					name: station.format,
				};
				return;
			}
		} );
		formats = Object.values( formats ).sort();

		return formats;
	},

	get stations() {
		if ( ! store._stations.length ) return [];

		const stations = store._stations.filter( ( station ) => {
			let found = true;

			if ( isFiltered( 'state' ) && station.state !== store.state ) {
				found = false;
			}

			if ( isFiltered( 'city' ) ) {
				const cityKey = `${ station.state }|${ station.city }`;
				if ( cityKey !== store.city ) {
					found = false;
				}
			}

			if ( isFiltered( 'format' ) && station.format !== store.format ) {
				found = false;
			}

			if ( store.query.length ) {
				const searchable = [
					station?.id,
					station?.format,
					station?.freq,
					station?.url,
					station?.calls,
					station?.band,
					station?.city,
					station?.state,
				].map( ( v ) =>
					typeof v === 'string'
						? v?.toLowerCase()
						: String( v ).toLowerCase()
				);
				if (
					! searchable.filter( ( v ) =>
						v.includes( store.query.toLowerCase() )
					)?.length
				) {
					found = false;
				}
			}

			return found;
		} );

		return sortBy( stations, [ 'city', 'state', 'id' ] );
	},
} );

effect( () => {
	if ( ! store._stations.length ) return;

	const cities = store.cities;
	const states = store.states;
	const formats = store.formats;

	if ( ! states.length ) {
		store.state = initialState.state;
	} else if ( states.length === 1 ) {
		store.state = states[ 0 ].value;
	}

	if ( ! cities.length ) {
		store.city = initialState.city;
	} else if ( cities.length === 1 ) {
		store.city = cities[ 0 ].value;
	}

	if ( ! formats.length ) {
		store.format = initialState.format;
	} else if ( formats.length === 1 ) {
		store.format = formats[ 0 ];
	}

	// Reset formats filter if format is filtered, city/state
	// is filtered, and no stations are found.
	if (
		isFiltered( 'format' ) &&
		( isFiltered( 'state' ) || isFiltered( 'city' ) ) &&
		! store.formats.includes( store.format ) &&
		! store.stations.length
	) {
		store.format = initialState.format;
	}
} );
