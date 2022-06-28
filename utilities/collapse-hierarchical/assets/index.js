import './index.scss';
import jQuery from 'jquery';

let $ = jQuery.noConflict();
( () => {
	const $body = $( 'body.wp-cmls-collapsable' );
	if ( ! $body.length ) {
		return;
	}

	const relationships = {};
	function generateRelationshipsFromDOM() {
		$( '#the-list tr' ).each( ( i, el ) => {
			const $this = $( el ),
				id = parseInt(
					$this
						.find(
							'input[name="post[]"],input[name="delete_tags[]"]'
						)
						.attr( 'value' )
				);

			if ( ! id ) {
				return;
			}

			const parent = parseInt(
					$this.find( '.post_parent,.parent' ).text()
				),
				type = el.id.substring( 0, el.id.indexOf( '-' ) ),
				parentId = type + '-' + parent,
				postId = type + '-' + id;
			let level = 0,
				levelMatch = el.className.match( /level\-(\d+)/ );

			if ( levelMatch.length > 1 ) {
				level = parseInt( levelMatch[ 1 ] );
			}

			const newVal = {
				node: el,
				level: level,
				children: relationships[ postId ]?.children || [],
				has_parent: relationships[ postId ]?.has_parent || parent,
				collapsed: relationships[ postId ]?.collapsed || false,
			};

			relationships[ postId ] = newVal;

			// Check if parent already exists
			if ( parent ) {
				if ( relationships[ parentId ]?.children ) {
					relationships[ parentId ].children.push( el );
				} else {
					relationships[ parentId ] = {
						children: [ el ],
					};
				}
			}
		} );
	}

	// Init collapse state from local storage state
	function initFromStorage() {
		const ls = JSON.parse( localStorage.getItem( 'wcc-state' ) );
		if ( ls ) {
			ls.forEach( ( val ) => {
				relationships[ val ] = {
					collapsed: true,
				};
			} );
		}
	}

	function updateStorage() {
		const storeVal = [];
		for ( let i in relationships ) {
			if ( relationships[ i ].collapsed ) {
				storeVal.push( i );
			}
		}
		localStorage.setItem( 'wcc-state', JSON.stringify( storeVal ) );
	}

	function addHideClass( postId ) {
		$( el ).addClass( 'wcc-hide' );
	}

	function collapse( id ) {
		if ( relationships?.[ id ] ) {
			relationships[ id ].collapsed = true;
			$( relationships[ id ].node ).addClass( 'wcc-collapsed' );
			function hide( el ) {
				$( el ).addClass( 'wcc-hide' );
				$( el ).after( '<tr class="wcc-stripe"/>' );
				if ( relationships[ el.id ]?.children?.length ) {
					relationships[ el.id ].children.forEach( hide );
				}
			}
			if ( relationships[ id ]?.children?.length ) {
				relationships[ id ].children.forEach( hide );
			}
			updateStorage();
		}
	}

	function collapseAll( e ) {
		e.preventDefault();
		for ( let i in relationships ) {
			if ( relationships[ i ].children?.length ) {
				collapse( i );
			}
		}
	}

	function expand( id ) {
		if ( relationships[ id ] ) {
			relationships[ id ].collapsed = false;
			$( relationships[ id ].node ).removeClass( 'wcc-collapsed' );
			function show( el ) {
				$( el ).removeClass( 'wcc-hide' );
				$( el ).siblings( '.wcc-stripe' ).remove();
				if (
					! relationships[ el.id ].collapsed &&
					relationships[ el.id ]?.children?.length
				) {
					relationships[ el.id ].children.forEach( show );
				}
			}
			if ( relationships[ id ]?.children?.length ) {
				relationships[ id ].children.forEach( show );
			}
			updateStorage();
		}
	}

	function expandAll( e ) {
		e.preventDefault();
		for ( let i in relationships ) {
			if ( relationships[ i ].children?.length ) {
				expand( i );
			}
		}
	}

	function updateAllFromState() {
		for ( let i in relationships ) {
			if ( relationships[ i ].collapsed ) {
				collapse( i );
			}
		}
	}

	// Setup
	initFromStorage();
	generateRelationshipsFromDOM();
	updateAllFromState();

	const $expander = $(
		'<i class="wpcch-toggle" title="Toggle children"></i>'
	);
	$( document ).on( 'click.wp-cmls-collapse-hierarchical', ( e ) => {
		if ( $( e.target ).is( '.wpcch-toggle' ) ) {
			e.preventDefault();
			const $target = $( e.target ).parents( 'tr' ),
				id = $target.attr( 'id' ),
				rel = relationships[ id ];
			if ( rel.collapsed ) {
				expand( id );
			} else {
				collapse( id );
			}
		}
	} );

	/**
	 * Header link setup
	 */
	const $headerLi = $( '<li/>' ),
		$headerA = $( '<a href="#" />' ),
		$expandAllLink = $headerA
			.clone( true )
			.text( 'Expand All' )
			.on( 'click.wp-cmls-collapse-hierarchical', expandAll ),
		$collapseAllLink = $headerA
			.clone( true )
			.text( 'Collapse All' )
			.on( 'click.wp-cmls-collapse-hierarchical', collapseAll );

	let $subsubsub = $( '.subsubsub' );
	if ( ! $subsubsub.length ) {
		$subsubsub = $(
			'<ul class="subsubsub" style="float: right; vertical-align: middle" />'
		).appendTo( '.bulkactions' );
	}
	// Add divider to any existing last li
	$subsubsub.find( 'li:last' ).append( ' |' ).after( '\n' );
	$subsubsub
		.append(
			$headerLi.clone( true ).append( $collapseAllLink ).append( ' |' )
		)
		.append( '\n' )
		.append( $headerLi.clone( true ).append( $expandAllLink ) )
		.append( '\n' );

	/**
	 * Initialize row display and actions
	 */
	for ( let i in relationships ) {
		let row = relationships[ i ],
			$row = $( row.node ),
			$title = $row.find( '.row-title' ),
			$actions = $row.find( '.row-actions' );

		$row.css( '--level', relationships[ i ].level );

		// Replace "—" in title
		if ( row.has_parent ) {
			$row.addClass( 'wcc-has_parent' );
			$title.text( $title.text().replace( /— /g, '' ) );
			// First bullet gets indented more
			$title.before( '&nbsp;<cite>•</cite>' );
			for ( let i = 1; i < row.level; i++ ) {
				$title.before( '<cite>•</cite>' );
			}
		}

		if ( row.children && row.children.length ) {
			$row.addClass( 'wcc-has_children' );
			let $actor = $expander
				.clone( true )
				.attr(
					'title',
					row.children.length > 1 ? 'Toggle children' : 'Toggle child'
				);
			$title.before( $actor );
			$title.after(
				' <cite title="Item has ' +
					row.children.length +
					( row.children.length > 1 ? ' children' : ' child' ) +
					'.">(' +
					row.children.length +
					')</cite>'
			);
			if ( row.collapsed ) {
				$row.addClass( 'wcc-collapsed' );
			}
		}
	}
} )();
