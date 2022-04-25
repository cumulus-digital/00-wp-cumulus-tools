import { stripDomain } from './utils';

import { __experimentalLinkControl as LinkControl } from '@wordpress/blockEditor';

const PostSearch = ( { attributes, setAttributes } ) => {
	return (
		<LinkControl
			searchInputPlaceholder="Search here…"
			value={ {
				url: attributes.href,
				title: attributes.alt,
				opensInNewTab: attributes.linkTarget === '_blank',
				useTitleAsAlt: true,
			} }
			settings={ [
				{
					id: 'opensInNewTab',
					title: 'Open in a new tab',
				},
				{
					id: 'useTitleAsAlt',
					title: 'Use Post Title as "alt" attribute',
				},
			] }
			onChange={ ( val ) => {
				setAttributes( {
					href: stripDomain( val.url ),
					alt: val.useTitleAsAlt ? val.title : attributes.alt,
					linkTarget: val.opensInNewTab ? '_blank' : '_self',
					rel: val.opensInNewTab ? 'noopener' : '',
				} );
			} }
			onRemove={ () =>
				setAttributes( {
					href: null,
					linkTarget: null,
					rel: null,
				} )
			}
		/>
	);
};

export default PostSearch;
