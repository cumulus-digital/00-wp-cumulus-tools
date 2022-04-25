import { TextControl } from '@wordpress/components';

const AltInput = ( { attributes, setAttributes } ) => {
	return (
		<TextControl
			label="Image Alt Attribute"
			help={
				<>
					{ ! attributes.alt && (
						<strong
							style={ {
								color: 'red',
								fontStyle: 'italic',
							} }
						>
							Alt attributes are <u>necessary</u> for SEO and
							accessibility!
						</strong>
					) }
					<> </>
					This should be the name of the show you're featuring or some
					other short, text interpretation of the image/link.
				</>
			}
			value={ attributes.alt }
			onChange={ ( val ) => setAttributes( { alt: val } ) }
		/>
	);
};

export default AltInput;
