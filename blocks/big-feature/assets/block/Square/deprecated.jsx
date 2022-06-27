import { isDefault } from './utils';
import { useBlockProps } from '@wordpress/blockEditor';
import { select } from '@wordpress/data';
import metadata from './square.block.json';

const LinkWrapper = ( props ) => {
	if ( props.href ) {
		const linkProps = { href: props.href };
		if ( props.linkTarget ) {
			linkProps.target = props.linkTarget;
		}
		if ( props.rel ) {
			linkProps.rel = props.rel;
		}
		return <a { ...linkProps }>{ props.children }</a>;
	}
	return <>{ props?.children }</>;
};

const deprecated = [
	// 2022-06-27
	{
		attributes: metadata.attributes,
		save( props ) {
			const { attributes } = props;
			const blockProps = useBlockProps.save();
			const w = attributes?.mediaDimensions?.width;
			const h = attributes?.mediaDimensions?.height;

			const ret =
				attributes.mediaUrl && ! isDefault( attributes, 'mediaUrl' ) ? (
					<li { ...blockProps }>
						<LinkWrapper { ...attributes }>
							<img
								src={ attributes.mediaUrl }
								alt={ attributes.alt }
								className={ `wp-image-${ attributes.mediaId }` }
								width={ w ? `${ w }px` : '1000px' }
								height={ h ? `${ h }px` : '1000px' }
							/>
						</LinkWrapper>
					</li>
				) : (
					<li { ...blockProps }></li>
				);

			return ret;
		},
	},
	// 2022-06-03
	{
		attributes: metadata.attributes,
		save( props ) {
			const { attributes } = props;
			const blockProps = useBlockProps.save();

			return attributes.mediaUrl &&
				! isDefault( attributes, 'mediaUrl' ) ? (
				<li { ...blockProps }>
					<LinkWrapper { ...props.attributes }>
						<img
							src={ props.attributes.mediaUrl }
							alt={ props.attributes.alt }
							width="1000px"
							height="1000px"
						/>
					</LinkWrapper>
				</li>
			) : (
				<li { ...blockProps }></li>
			);
		},
	},
];

export default deprecated;
