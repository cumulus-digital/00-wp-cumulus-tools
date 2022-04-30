// Block display alternative to WP's own PanelRow

import { forwardRef } from '@wordpress/element';

const PanelRow = forwardRef( ( { className, children }, ref ) => (
	<div
		className="components-panel__row"
		style={ { display: 'block' } }
		ref={ ref }
	>
		{ children }
	</div>
) );
export default PanelRow;
