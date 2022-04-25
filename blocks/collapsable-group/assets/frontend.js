import './fontello/css/cumulus_gutenberg-collapsable_group-icons.css';
import './frontend.scss';

import { debounce } from 'lodash';
import supportsPassive from 'Utilities/detect.passive.js';
import jQuery from 'jquery';

const $ = jQuery;
const init = () => {
	// Don't load in the editor
	if ( document.body.classList.contains( 'block-editor-page' ) ) {
		//console.log( 'Editor detected, exiting' );
		return;
	}

	const mobileMediaQuery = matchMedia( '(min-width: 768px)' );
	let isMobile = false;
	const mmqListener = ( e ) => {
		isMobile = ! e.matches;
	};
	mobileMediaQuery.addEventListener( 'change', mmqListener );
	mmqListener( mobileMediaQuery );

	const fuzzyCompare = ( left, comp, right, fuzz = 3 ) => {
		const lt = ( left, right ) => {
			return left - fuzz <= right || left + fuzz <= right;
		};
		const gt = ( left, right ) => {
			return left - fuzz >= right || left + fuzz >= right;
		};
		switch ( comp ) {
			case '>':
			case '>=':
				return gt( left, right );
				break;
			case '<':
			case '<=':
				return lt( left, right );
				break;
		}
	};

	const generatedIds = [];
	const generateId = () => {
		let id =
			Date.now().toString( 36 ) +
			Math.random().toString( 36 ).substring( 2 );
		if ( generatedIds.includes( id ) ) {
			return generateId();
		}
		generatedIds.push( id );
		return id;
	};

	//const CollapseGroups = [];

	const selectors = {
		group: '.wp-block-cumulus-gutenberg-collapsable-group',
		header: '.wp-block-cumulus-gutenberg-collapsable-group-header',
		body: '.wp-block-cumulus-gutenberg-collapsable-group-body',
		placeholder:
			'.wp-block-cumulus-gutenberg-collapsable-group-placeholder',
	};

	class Group {
		uid = null;
		el = null;
		$el = null;
		header = null;
		body = null;

		classes = {
			stuck: 'is-stuck',
			bottomed: 'is-bottom',
			overflow: 'is-overflow',
			expanded: 'is-expanded',
		};
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

			this.$el = $( this.el );

			this.uid = generateId();

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
			this.el.classList[ func ]( this.classes.expanded );
			this.setState( 'expanded', newState );
			this.header.setAttribute( 'aria-expanded', newState );
			this.body.setAttribute( 'aria-hidden', ! newState );
		}
	}

	class StickyCollapseGroup extends CollapseGroup {
		placeholder = null;
		stickyPosition = null;
		cache = {
			offset: null,
			position: null,
			height: null,
			width: null,
			margin: {
				top: null,
				right: null,
				bottom: null,
				left: null,
			},
			padding: {
				top: null,
				right: null,
				bottom: null,
				left: null,
			},
			container: {
				desktop: {
					attribute: 'data-sticky-desktop-container',
					el: null,
					$el: null,
					height: null,
					offset: null,
				},
				mobile: {
					attribute: 'data-sticky-mobile-container',
					el: null,
					$el: null,
					height: null,
					offset: null,
				},
			},
		};

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

				for ( const device in this.cache.container ) {
					this.cache.container[ device ].el = this.el.closest(
						this.el.getAttribute(
							this.cache.container[ device ].attribute
						)
					);
					if ( this.cache.container[ device ].el ) {
						this.cache.container[ device ].$el = $(
							this.cache.container[ device ].el
						);
					} else {
						this.cache.container[ device ].el = document.body;
						this.cache.container[ device ].$el = $( document.body );
					}
				}
				this.update();
				if ( window?.ResizeObserver ) {
					this.resizeObserver = new ResizeObserver(
						debounce( this.onResize, 30 )
					);
					this.resizeObserver.observe( this.el );
				}
			}
		}

		update() {
			if ( ! this.isStickable ) {
				return;
			}

			this.enabled = false;

			this.unstyle();

			const originalMarginBottom = this.el.style.marginBottom;
			let stickyPosition = getComputedStyle( this.el ).getPropertyValue(
				'--sticky-position'
			);
			this.el.style.setProperty( 'margin-bottom', stickyPosition );
			stickyPosition = parseFloat(
				getComputedStyle( this.el ).marginBottom
			);
			this.el.style.marginBottom = originalMarginBottom;
			//console.log( 'stickyPosition', stickyPosition );

			const device = isMobile ? 'mobile' : 'desktop';
			const boundaryStyle = getComputedStyle(
				this.cache.container[ device ].el
			);
			if ( boundaryStyle.position === 'static' ) {
				this.cache.container[ device ].el.style.setProperty(
					'position',
					'relative'
				);
			}

			Object.assign( this, {
				stickyPosition: stickyPosition,
				cache: {
					offset: this.$el.offset(),
					position: this.$el.position(),
					height: this.$el.outerHeight(),
					width: this.$el.outerWidth(),
					style: this.el.getAttribute( 'style' ),
					margin: {
						top: parseInt( this.$el.css( 'marginTop' ), 10 ) || 0,
						right:
							parseInt( this.$el.css( 'marginRight' ), 10 ) || 0,
						bottom:
							parseInt( this.$el.css( 'marginBottom' ), 10 ) || 0,
						left: parseInt( this.$el.css( 'marginLeft' ), 10 ) || 0,
					},
					padding: {
						top: parseInt( this.$el.css( 'paddingTop' ), 10 ) || 0,
						right:
							parseInt( this.$el.css( 'paddingRight' ), 10 ) || 0,
						bottom:
							parseInt( this.$el.css( 'paddingBottom' ), 10 ) ||
							0,
						left:
							parseInt( this.$el.css( 'paddingLeft' ), 10 ) || 0,
					},
					container: {
						...this.cache.container,
						desktop: {
							...this.cache.container.desktop,
							height: this.cache.container.desktop.$el.height(),
							offset: this.cache.container.desktop.$el.offset(),
						},
						mobile: {
							...this.cache.container.mobile,
							height: this.cache.container.mobile.$el.height(),
							offset: this.cache.container.mobile.$el.offset(),
						},
					},
				},
			} );
			//console.log( this.cache.container );

			// Remove margins from offset?
			this.cache.offset.left -= this.cache.margin.left;
			this.cache.offset.top -= this.cache.margin.top;

			this.restyle();

			Object.assign( this, {
				stateStuck:
					this.stateStuck === null
						? this.el.classList.contains( this.classes.stuck )
						: this.stateStuck,
				stateOverflow:
					this.stateOverflow === null
						? this.el.classList.contains( this.classes.overflow )
						: this.stateOverflow,
				stateBottomed:
					this.stateBottomed === null
						? this.el.classList.contains( this.classes.bottomed )
						: this.stateBottomed,
			} );

			this.setupScrollEvent();

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
				this.cache.height
			);
			this.$el.after( this.placeholder );
			return this.placeholder;
		}

		unstyle() {
			this.cache.originalClassNames = this.el.className;
			this.el.classList.remove( ...Object.values( this.classes ) );
			this.header.setAttribute( 'aria-expanded', true );
			this.body.setAttribute( 'aria-hidden', false );
			this.el.style.removeProperty( 'width' );
		}
		restyle() {
			if ( this.stateStuck ) {
				this.setStuck( true );
				this.setBottomed( this.stateBottomed );
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

		scrollHandler() {
			const scroll = $( window ).scrollTop();
			const device = isMobile ? 'mobile' : 'desktop';
			if (
				// Scrolled past top
				fuzzyCompare(
					scroll,
					'>=',
					this.cache.offset.top - this.stickyPosition
				) &&
				// Did not reach bottom
				fuzzyCompare(
					scroll,
					'<=',
					this.cache.container[ device ].offset.top +
						this.cache.container[ device ].height -
						this.stickyPosition -
						this.cache.height,
					1
				) &&
				// is not already stuck
				( ! this.stateStuck ||
					// or is bottomed
					this.stateBottomed )
			) {
				if ( this.stateBottomed ) {
					this.setBottomed( false );
				}
				this.setStuck( true );
			} else if (
				// scrolled above original top position
				fuzzyCompare(
					scroll,
					'<',
					this.cache.offset.top - this.stickyPosition,
					1
				) &&
				// is currently stuck
				this.stateStuck
			) {
				this.setStuck( false );
			} else if (
				// scrolled past container bottom
				fuzzyCompare(
					scroll,
					'>=',
					this.cache.container[ device ].offset.top +
						this.cache.container[ device ].height -
						this.stickyPosition +
						// Accounts for scrolling an overflowed body
						this.body.scrollTop -
						this.cache.height,
					1
				) &&
				// is not already bottomed
				! this.stateBottomed &&
				! ( isMobile && this.stateExpanded )
			) {
				if ( ! this.stateStuck ) {
					this.setStuck( true );
				}
				this.setBottomed( true );
			}
		}

		setupScrollEvent() {
			const event_name = `scroll.${ this.uid }`;
			if ( this.onlyStickOnMobile && ! isMobile ) {
				this.setStuck( false );
				this.setBottomed( false );
				$( window ).off( event_name );
				return;
			}
			$( window )
				.off( event_name )
				.on(
					event_name,
					debounce( () => {
						this.scrollHandler();
					}, 10 )
				);
			this.scrollHandler();
		}

		setStuck( newState = null ) {
			if ( newState === null ) {
				newState = ! this.stateStuck;
			}
			let func = newState ? 'add' : 'remove';
			this.el.classList[ func ]( this.classes.stuck );
			this.placeholder.style.setProperty(
				'display',
				newState ? 'block' : 'none'
			);
			this.stateStuck = newState;
			if ( newState ) {
				//console.log( 'stuck', this.cache );
				this.cache.style = JSON.parse(
					JSON.stringify( this.el.style )
				);
				Object.assign( this.el.style, {
					left: this.cache.offset.left + 'px',
					top: this.stickyPosition + 'px',
					width: this.cache.width + 'px',
				} );
			} else {
				//console.log( 'unstuck', this.cache );
				Object.assign( this.el.style, {
					left: this.cache.style.left,
					top: this.cache.style.top,
					width: this.cache.style.width,
				} );
			}
			//console.log( 'setStuck', newState );
		}

		setBottomed( newState = null ) {
			const device = isMobile ? 'mobile' : 'desktop';
			if ( newState === null ) {
				newState = ! this.stateBottomed;
			}
			let func = newState ? 'add' : 'remove';
			this.el.classList[ func ]( this.classes.bottomed );
			this.stateBottomed = newState;
			if ( newState ) {
				//console.log( 'bottomed', this.cache );
				Object.assign( this.el.style, {
					left: this.cache.position.left,
					top:
						this.cache.container[ device ].height -
						this.cache.height +
						'px',
					width: this.cache.width,
				} );
			} else {
				//console.log( 'unbottomed', this.cache );
			}
			//console.log( 'setBottomed', newState );
		}
	}

	const computeStickies = debounce( () => {
		const groups = document.querySelectorAll( selectors.group );
		if ( groups && groups.length ) {
			//CollapseGroups.length = 0;

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
					group.CollapseGroup.update();
				}
				group.CollapseGroup.setAria();

				//CollapseGroups.push( group.CollapseGroup );
				group.CollapseGroup.enabled = true;
			} );
		}
	}, 100 );

	addEventListener( 'load', () => {
		computeStickies();
	} );

	addEventListener(
		'resize',
		debounce( computeStickies, 200, { leading: false, trailing: true } )
	);

	// Don't activate header links when mobile and collapsable
	addEventListener( 'click', ( e ) => {
		if ( ! isMobile ) {
			return;
		}
		if ( e.target.matches( selectors.header + ' a' ) ) {
			const group = e.target.closest( selectors.group );
			if ( group && group.CollapseGroup instanceof CollapseGroup ) {
				e.preventDefault();
			}
		}
	} );

	// Expand/collapse group on mobile
	addEventListener(
		'click',
		( e ) => {
			if ( ! isMobile ) {
				return;
			}
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
};

addEventListener( 'DOMContentLoaded', init );
