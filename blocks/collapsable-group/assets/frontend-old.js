import debounce from 'lodash/debounce';
import supportsPassive from 'Utilities/detect.passive.js';

const init = () => {
	// Don't load in the editor
	if ( document.body.classList.contains( 'block-editor-page' ) ) {
		console.log( 'Editor detected, exiting' );
		return;
	}

	const mobileMediaQuery = window.matchMedia( '(min-width: 768px)' );
	let isMobile = false;
	const mmqListener = ( e ) => {
		isMobile = ! e.matches;
	};
	mobileMediaQuery.addEventListener( 'change', mmqListener );
	mmqListener( mobileMediaQuery );

	const outerHeight = ( el ) => {
		var height = el.offsetHeight;
		var style = getComputedStyle( el );
		height +=
			parseFloat( style.marginTop ) + parseFloat( style.marginBottom );
		return height;
	};
	const outerWidth = ( el ) => {
		var width = el.offsetWidth;
		var style = getComputedStyle( el );
		width +=
			parseFloat( style.marginLeft ) + parseFloat( style.marginRight );
		return width;
	};

	const CollapseGroups = [];

	const selectors = {
		group: '.wp-block-cumulus-gutenberg-collapsable-group',
		header: '.wp-block-cumulus-gutenberg-collapsable-group-header',
		body: '.wp-block-cumulus-gutenberg-collapsable-group-body',
		placeholder:
			'.wp-block-cumulus-gutenberg-collapsable-group-placeholder',
	};
	const classes = {
		stuck: 'is-stuck',
		bottomed: 'is-bottom',
		overflow: 'is-overflow',
		expanded: 'is-expanded',
	};

	class Group {
		el = null;
		header = null;
		body = null;

		originalClassNames = null;

		stateListeners = [];

		enabled = false;

		constructor( settings ) {
			if ( ! settings.el ) {
				throw 'Must supply an el to StickGroup!';
			}
			Object.keys( settings ).forEach( ( k ) => {
				this[ k ] = settings[ k ];
			} );

			this.CollapseGroup = this;
		}

		registerListener( cb ) {
			this.stateListeners.push( cb );
		}

		fireStateListeners( state ) {
			this.stateListeners.forEach( ( cb ) => cb( state ) );
		}

		setState( state, val ) {
			this[ 'state' + state[ 0 ].toUpperCase() + state.slice( 1 ) ] = val;
			this.fireStateListeners( {
				group: this.el,
				state: state,
				val: val,
			} );
		}
	}

	class CollapseGroup extends Group {
		isCollapsable = false;

		stateExpanded = false;

		constructor( settings ) {
			super( settings );

			this.isCollapsable = this.el.classList.contains(
				'has-collapse-on-mobile'
			);

			this.setAria();
		}

		setAria() {
			let expanded = false;
			if ( ! isMobile ) {
				const hStyle = getComputedStyle( this.body );
				expanded = hStyle.display === 'hidden' ? false : true;
			}
			this.header.setAttribute( 'aria-expanded', expanded );
			this.body.setAttribute( 'aria-hidden', ! expanded );
			//this.stateExpanded = expanded;
			this.setState( 'expanded', expanded );
			return expanded;
		}

		isExpanded() {
			if ( ! this.isCollapsable ) {
				return false;
			}
			let style = getComputedStyle( this.el );
			return style.getPropertyValue( 'display' ) !== 'none';
		}

		setExpanded( newState = ! this.stateExpanded ) {
			if ( ! isMobile ) {
				return false;
			}
			let func = newState ? 'add' : 'remove';
			this.el.classList[ func ]( classes.expanded );
			this.setState( 'expanded', newState );
			this.header.setAttribute( 'aria-expanded', newState );
			this.body.setAttribute( 'aria-hidden', ! newState );
		}
	}

	class StickyCollapseGroup extends CollapseGroup {
		placeholder = null;
		originalTop = null;
		fullStyle = null;
		fullBox = null;
		fullHeight = null;
		stickyPosition = null;

		padding = {
			top: null,
			right: null,
			bottom: null,
			left: null,
		};
		borderWidth = {
			top: null,
			right: null,
			bottom: null,
			left: null,
		};

		boundary = null;
		boundaryBox = null;

		isStickable = false;
		onlyStickOnMobile = false;

		stateStuck = false;
		stateBottomed = false;
		stateOverflow = false;

		constructor( settings ) {
			super( settings );

			this.isStickable = this.el.classList.contains(
				'has-sticky-position'
			);
			this.onlyStickOnMobile = this.el.classList.contains(
				'has-only-stick-on-mobile'
			);

			if ( this.isStickable ) {
				this.generatePlaceholder();
				this.boundary = document.querySelector(
					this.el.getAttribute( 'data-sticky-boundary' )
				);
				this.calculatePositions();
				if ( window.ResizeObserver ) {
					this.resizeObserver = new ResizeObserver(
						debounce( this.onResize, 30 )
					);
					this.resizeObserver.observe( this.el );
				}
			}
		}

		calculatePositions() {
			if ( ! this.isStickable ) {
				return;
			}

			this.enabled = false;

			this.unstyle();
			const box = this.el.getBoundingClientRect();
			const style = getComputedStyle( this.el );

			let stickyPosition = getComputedStyle( this.el ).getPropertyValue(
				'--sticky-position'
			);
			this.el.style.setProperty( 'height', stickyPosition );
			stickyPosition = parseFloat(
				getComputedStyle( this.el ).height.slice( 0, -2 )
			);
			this.el.style.removeProperty( 'height' );

			if ( this.boundary ) {
				let boundaryStyle = getComputedStyle( this.boundary );
				if ( boundaryStyle.position === 'static' ) {
					this.boundary.style.setProperty( 'position', 'relative' );
				}
			} else {
				this.boundary = document.body;
			}

			Object.assign( this, {
				originalTop: this.el.offsetTop,
				fullBox: JSON.parse( JSON.stringify( box ) ),
				fullStyle: JSON.parse( JSON.stringify( style ) ),
				boundaryBox: JSON.parse(
					JSON.stringify( this.boundary.getBoundingClientRect() )
				),
				oldWidth: outerWidth( this.el ),
				outerHeight: outerHeight( this.el ),
				stickyPosition: stickyPosition,
				padding: {
					top: parseFloat( style.paddingTop ),
					right: parseFloat( style.paddingRight ),
					bottom: parseFloat( style.paddingBottom ),
					left: parseFloat( style.paddingLeft ),
				},
				borderWidth: {
					top: parseFloat( style.borderTopWidth ),
					right: parseFloat( style.borderRightWidth ),
					bottom: parseFloat( style.borderBottomWidth ),
					left: parseFloat( style.borderLeftWidth ),
				},
			} );

			this.restyle();

			Object.assign( this, {
				stateStuck: this.el.classList.contains( classes.stuck ),
				stateOverflow: this.el.classList.contains( classes.overflow ),
				stateBottomed: this.el.classList.contains( classes.bottomed ),
			} );

			this.enabled = true;
		}

		generatePlaceholder() {
			if ( ! this.isStickable ) {
				return;
			}

			this.placeholder = document.createElement( 'div' );
			this.placeholder.classList.add(
				selectors.placeholder.substring( 1 )
			);
			Object.assign( this.placeholder.style, {
				display: 'none',
				height: 'var(--placeholder-height)',
			} );
			this.placeholder.style.setProperty(
				'--placeholder-height',
				outerHeight( this.el ) + 'px'
			);
			this.el.after( this.placeholder );
			return this.placeholder;
		}

		unstyle() {
			this.originalClassNames = this.el.className;
			this.el.classList.remove( ...Object.values( classes ) );
			this.header.setAttribute( 'aria-expanded', true );
			this.body.setAttribute( 'aria-hidden', false );
			this.el.style.removeProperty( 'width' );
		}
		restyle() {
			if ( this.shouldStick() ) {
				this.setStuck( true );

				this.setOverflow( this.shouldOverflow() );
				this.setBottomed( this.shouldBottom() );
			} else {
				this.setStuck( false );
			}
			this.header.setAttribute( 'aria-expanded', !! this.stateExpanded );
			this.body.setAttribute( 'aria-hidden', ! this.stateExpanded );
		}

		onResize( entries ) {
			for ( let entry of entries ) {
				if ( ! entry.target.CollapseGroup || ! entry.borderBoxSize ) {
					continue;
				}
				const borderBoxSize = Array.isArray( entry.borderBoxSize )
					? entry.borderBoxSize[ 0 ]
					: entry.borderBoxSize;

				// Update placeholder height
				entry.target.CollapseGroup?.placeholder?.style?.setProperty(
					'--placeholder-height',
					borderBoxSize.blockSize + 'px'
				);
			}
		}

		#toggleState( state, askState = null ) {
			let newState = askState;
			if ( askState === null ) {
				newState = ! this[
					'state' + state.charAt( 0 ).toUpperCase() + state.slice( 1 )
				];
			}
			if ( ! newState === askState ) {
				return ! newState;
			}
			let hasClass = this.el.classList.contains( classes[ state ] );
			if ( newState && ! hasClass ) {
				this.el.classList.add( classes[ state ] );
			} else if ( ! newState && hasClass ) {
				this.el.classList.remove( classes[ state ] );
			}
			this.setState( state, newState );
			return newState;
		}

		setStuck( askState = null ) {
			let newState = askState;
			if ( askState === null ) {
				newState = ! this.stateStuck;
			}
			if ( ! this.isStickable || ! newState === askState ) {
				return ! newState;
			}
			if ( newState ) {
				if ( this.el.style.width ) {
					this.oldWidth = this.el.style.width;
				}
				this.el.style.setProperty( 'width', this.fullBox.width + 'px' );
				this.placeholder?.style?.setProperty( 'display', 'block' );
			} else {
				this.el.style.removeProperty( 'width' );
				if ( this.oldWidth ) {
					this.el.style.setProperty( 'width', this.oldWidth );
				}
				this.placeholder?.style?.setProperty( 'display', 'none' );
			}
			return this.#toggleState( 'stuck', newState );
		}

		setBottomed( newState = null ) {
			if ( ! this.isStickable ) {
				return this.stateBottomed;
			}
			return this.#toggleState( 'bottomed', newState );
		}

		setOverflow( newState = null ) {
			if ( ! this.isStickable ) {
				return this.stateOverflow;
			}
			if ( this.shouldStick() ) {
				return this.#toggleState( 'overflow', newState );
			}
			return this.#toggleState( 'overflow', false );
		}

		shouldStick() {
			if ( this.onlyStickOnMobile && ! isMobile ) {
				return false;
			}
			let boundaryBox = this.boundary.getBoundingClientRect();
			console.log( window.pageYOffset, boundaryBox.top );
			if (
				this.isStickable &&
				( window.pageYOffset + 5 >= this.fullBox.y ||
					window.pageYOffset - 5 >= this.fullBox.y )
			) {
				return true;
			}
			return false;
		}

		shouldBottom() {
			if ( ! this.isStickable || isMobile ) {
				return false;
			}

			let limit =
				this.boundaryBox.x +
				this.boundaryBox.height -
				this.outerHeight -
				this.stickyPosition +
				this.body.scrollTop -
				this.padding.top -
				this.padding.bottom -
				this.borderWidth.top -
				this.borderWidth.bottom;

			if (
				window.pageYOffset + 5 >= limit ||
				window.pageYOffset - 5 >= limit
			) {
				return true;
			}
			return false;
		}

		shouldOverflow() {
			if (
				! this.isStickable ||
				! this.stateStuck ||
				this.stateBottomed
			) {
				return false;
			}
			const curBox = this.el.getBoundingClientRect();
			if ( curBox.top + curBox.height >= window.innerHeight ) {
				return true;
			}
			return false;
		}
	}

	const computeStickies = debounce( () => {
		const groups = document.querySelectorAll( selectors.group );
		if ( groups && groups.length ) {
			CollapseGroups.length = 0;

			[].forEach.call( groups, ( group ) => {
				if ( ! group.CollapseGroup ) {
					const header = group.querySelector( selectors.header );
					const body = group.querySelector( selectors.body );

					let groupType = Group;
					if (
						group.classList.contains( 'has-collapse-on-mobile' )
					) {
						groupType = CollapseGroup;
					}
					if ( group.classList.contains( 'has-sticky-position' ) ) {
						groupType = StickyCollapseGroup;
					}
					group.CollapseGroup = new groupType( {
						el: group,
						header: header,
						body: body,
					} );
				} else if (
					group.CollapseGroup instanceof StickyCollapseGroup
				) {
					group.CollapseGroup.calculatePositions();
				}
				group.CollapseGroup.setAria();

				CollapseGroups.push( group.CollapseGroup );
				group.CollapseGroup.enabled = true;
			} );

			window.removeEventListener( 'scroll', handleScroll );
			window.addEventListener( 'scroll', handleScroll );
		}
	}, 100 );

	const handleScroll = debounce(
		() => {
			if ( ! CollapseGroups.length ) {
				return;
			}
			CollapseGroups.forEach( ( group ) => {
				if (
					! group.CollapseGroup ||
					! ( group.CollapseGroup instanceof StickyCollapseGroup )
				) {
					return;
				}
				if ( group.CollapseGroup.shouldStick() ) {
					group.CollapseGroup.setStuck( true );

					group.CollapseGroup.setOverflow(
						group.CollapseGroup.shouldOverflow()
					);
					group.CollapseGroup.setBottomed(
						group.CollapseGroup.shouldBottom()
					);
				} else {
					group.CollapseGroup.setStuck( false );
				}
			} );
		},
		3,
		{ leading: true, trailing: true }
	);
	addEventListener( 'load', () => {
		computeStickies();
	} );

	addEventListener(
		'resize',
		debounce( computeStickies, 200, { leading: true, trailing: true } )
	);

	addEventListener(
		'click',
		( e ) => {
			const header = e.target.closest( selectors.header );
			if ( header ) {
				const group = header.parentNode;
				if ( group.CollapseGroup instanceof CollapseGroup ) {
					group.CollapseGroup.setExpanded();
				}
			}
		},
		supportsPassive ? { passive: true } : null
	);

	computeStickies();
};

addEventListener( 'DOMContentLoaded', init );
