import { MediaReplacer } from './media-uploader';
import AltInput from './alt-input';
import PostSearch from './post-search';
import { isDefault } from './utils';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';
import {
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
	Icon,
} from '@wordpress/components';
import { BlockControls } from '@wordpress/blockEditor';

const SquareBlockControls = ( { attributes, setAttributes, mediaSize } ) => {
	const warningIcon = <Icon icon="warning" style={ { color: 'red' } } />;

	return (
		<BlockControls>
			{ ! isDefault( attributes, 'mediaUrl' ) && (
				<>
					<ToolbarGroup>
						<MediaReplacer
							{ ...{ attributes, setAttributes } }
							mediaSize={ mediaSize }
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						<Dropdown
							headerTitle="Alt Attribute"
							contentClassNAme="is-alternate"
							renderToggle={ ( { isOpen, onToggle } ) => (
								<ToolbarButton
									icon={
										attributes.alt ? 'awards' : warningIcon
									}
									label={
										attributes.alt
											? 'Change "alt" attribute'
											: 'Set an "alt" attribute!'
									}
									name="Alt"
									title={
										attributes.alt
											? 'Change "alt" attribute'
											: 'Set an "alt" attribute!'
									}
									isActive={ attributes.alt ? true : false }
									showTooltip={ true }
									aria-expanded={ isOpen }
									aria-haspopup={ true }
									onClick={ onToggle }
								/>
							) }
							renderContent={ () => {
								return (
									<div
										style={ {
											minWidth: '250px',
											paddingTop: '6px',
											paddingRight: '16px',
											paddingLeft: '16px',
										} }
									>
										<AltInput
											{ ...{ attributes, setAttributes } }
										/>
									</div>
								);
							} }
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						<Dropdown
							headerTitle="Link"
							renderToggle={ ( { isOpen, onToggle } ) => (
								<>
									{ ! attributes.href && (
										<ToolbarButton
											name="link"
											icon={ linkIcon }
											title="Set a link"
											onClick={ onToggle }
											aria-expanded={ isOpen }
											aria-haspopup={ true }
											showTooltip={ true }
										/>
									) }
									{ attributes.href && (
										<ToolbarButton
											name="link"
											icon={ linkOffIcon }
											title="Change link"
											onClick={ onToggle }
											isActive={ true }
											aria-expanded={ isOpen }
											aria-haspopup={ true }
											showTooltip={ true }
										/>
									) }
								</>
							) }
							renderContent={ () => (
								<PostSearch
									{ ...{ attributes, setAttributes } }
								/>
							) }
						/>
					</ToolbarGroup>
				</>
			) }
		</BlockControls>
	);
};

export default SquareBlockControls;
