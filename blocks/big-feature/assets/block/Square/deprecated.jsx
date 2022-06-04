import { isDefault } from './utils';
import { useBlockProps } from '@wordpress/blockEditor';
import metadata from './square.block.json';

const deprecated = [
	// 2022-06-03
	{
		attributes: metadata.attributes,
		save: (props) => {
			const { attributes } = props;
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
							/>
						</LinkWrapper>
					</li>
				);
			}

			return <li {...blockProps}></li>;
		},
	},
];

export default deprecated;
