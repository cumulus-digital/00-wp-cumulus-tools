import { isDefault } from './utils';
import { useBlockProps } from '@wordpress/blockEditor';

const save = ({ attributes }) => {
	const blockProps = useBlockProps.save();

	const LinkWrapper = (props) => {
		if (props.href) {
			const linkProps = { href: props.href };
			if (props.linkTarget) {
				linkProps.target = props.linkTarget;
			}
			if (props.rel) {
				linkProps.rel = props.rel;
			}
			return <a {...linkProps}>{props.children}</a>;
		}
		return <>{props?.children}</>;
	};

	if (attributes.mediaUrl && !isDefault(attributes, 'mediaUrl')) {
		return (
			<li {...blockProps}>
				<LinkWrapper {...attributes}>
					<img
						src={attributes.mediaUrl}
						alt={attributes.alt}
						className={`wp-image-${attributes.mediaId}`}
					/>
				</LinkWrapper>
			</li>
		);
	}

	return <li {...blockProps}></li>;
};

export default save;
