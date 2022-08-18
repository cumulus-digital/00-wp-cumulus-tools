import { isDefault } from './utils';
import { useBlockProps } from '@wordpress/blockEditor';
import { select } from '@wordpress/data';

const save = ( props ) => {
	const blockProps = useBlockProps.save();
	const { attributes } = props;

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

	if ( attributes.mediaUrl && ! isDefault( attributes, 'mediaUrl' ) ) {
		const w = attributes?.mediaDimensions?.width;
		const h = attributes?.mediaDimensions?.height;
		return (
			<li { ...blockProps }>
				<LinkWrapper { ...attributes }>
					<img
						src={ attributes.mediaUrl }
						alt={ attributes.alt }
						className={ `wp-image-${ attributes.mediaId }` }
						loading={ attributes.lazyLoad ? 'lazy' : 'eager' }
						width={ w ? `${ w }px` : '' }
						height={ h ? `${ h }px` : '' }
						sizes={
							w < 800 ? '(min-width: 1000px) 33vw, 50vw' : '75vw'
						}
					/>
				</LinkWrapper>
			</li>
		);
	}

	return <li { ...blockProps }></li>;
};

export default save;
