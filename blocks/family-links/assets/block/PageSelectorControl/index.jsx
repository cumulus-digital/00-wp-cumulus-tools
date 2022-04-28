import { useState } from '@wordpress/element';
import PostTypeSelector from './post-type-selector';
import ChildPageSearch from './child-page-selector';
import {
	PanelRow,
	BaseControl,
	ToggleControl,
	SelectControl,
	TreeSelect,
	RangeControl,
	Flex,
	TextControl,
	Spinner,
	__experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

const PageSelectorControl = ( props ) => {
	const options = Object.assign(
		{
			showPostType: true,
			onPostTypeChange: () => {},
			selectedPostType: null,
			onPostChange: () => {},
			selectedPostId: null,
			onPostListLoad: () => {},
			beginTreeFrom: null,
		},
		props
	);
	const {
		showPostType,
		onPostTypeChange,
		selectedPostType,
		onPostChange,
		selectedPostId,
		beginTreeFrom,
		onPostListLoad,
	} = options;

	return (
		<>
			{ showPostType && (
				<PanelRow>
					<PostTypeSelector
						selectedPostType={ selectedPostType }
						onChange={ onPostTypeChange }
						filter={ ( pt ) => pt.hierarchical }
					/>
				</PanelRow>
			) }
			{ selectedPostType && (
				<PanelRow>
					<ChildPageSearch
						postType={ selectedPostType }
						selectedId={ selectedPostId }
						onChange={ onPostChange }
						beginTreeFrom={ beginTreeFrom }
						onLoad={ onPostListLoad }
					/>
				</PanelRow>
			) }
		</>
	);
};
export default PageSelectorControl;
