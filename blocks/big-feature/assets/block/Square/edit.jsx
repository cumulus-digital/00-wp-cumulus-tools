import SquareBlockControls from './square-block-controls';
import SquareInspectorControls from './square-inspector-controls';
import { MediaUploader } from './media-uploader';
import { isDefault } from './utils';

import { Icon } from '@wordpress/components';
import { useBlockProps } from '@wordpress/blockEditor';
import { useState, useEffect, useMemo } from '@wordpress/element';

const edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const [ classNames, setClassNames ] = useState( [] );
	const [ toolTips, setTooltips ] = useState( [] );
	const [ noticeIcons, setNoticeIcons ] = useState( [] );

	useMemo( () => {
		if ( isDefault( attributes, 'mediaUrl' ) ) {
			setClassNames( [ 'is-placeholder' ] );
		} else {
			const newClassNames = [];
			const newTitles = [];
			const newNoticeIcons = [];
			if ( isDefault( attributes, 'href' ) ) {
				newClassNames.push( 'is-unlinked' );
				newTitles.push( 'Needs a link.' );
				newNoticeIcons.push( <Icon key="1" icon="editor-unlink" /> );
			} else {
				newClassNames.push( 'is-linked' );
			}
			if ( isDefault( attributes, 'alt' ) ) {
				newClassNames.push( 'is-inaccessable' );
				newTitles.push( 'Needs an "alt" attribute.' );
				newNoticeIcons.push( <Icon key="2" icon="warning" /> );
			}
			if (
				! isDefault( attributes, 'mediaDimensions' ) &&
				attributes.mediaDimensions.width !==
					attributes.mediaDimensions.height
			) {
				newClassNames.push( 'is-not-square' );
				newTitles.push( 'Is not square.' );
				newNoticeIcons.push( <Icon key="3" icon="image-crop" /> );
			}
			if ( newClassNames.length ) {
				setClassNames( newClassNames );
				setTooltips( newTitles );
				setNoticeIcons( newNoticeIcons );
			}
		}
	}, [ attributes ] );

	useEffect(() => {
		// Remove _self attribute/rel noopener from old versions
		if ( ! attributes.linkTarget?.length || attributes.linkTarget === '_self') {
			setAttributes({ linkTarget: '', rel: attributes?.rel?.replace('noopener', '') });
		}
	}, []);

	const blockProps = useBlockProps( {
		className: classNames,
		title: toolTips.join( '\n' ),
	} );

	return (
		<li { ...blockProps }>
			<div className="g-bf-square_container">
				<SquareBlockControls { ...props } />
				<SquareInspectorControls { ...props } alerts={ toolTips } />
				{ ! isDefault( attributes, 'mediaUrl' ) ? (
					<>
						<img
							src={ attributes.mediaUrl }
							alt={ attributes.alt }
						/>
						{ noticeIcons.length ? (
							<div className="g-bf-notice-icons">
								{ noticeIcons }
							</div>
						) : null }
					</>
				) : (
					<MediaUploader
						{ ...props }
						render={ ( { open } ) => {
							return (
								<img
									className="g-bf-placeholder"
									src={ attributes.mediaUrl }
									alt="Click to add an image"
									title="Click to add an image"
									onClick={ open }
									style={ { cursor: 'pointer' } }
								/>
							);
						} }
					/>
				) }
			</div>
		</li>
	);
};

export default edit;
