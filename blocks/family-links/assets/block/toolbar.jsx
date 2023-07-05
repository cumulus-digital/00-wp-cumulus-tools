import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { AlignmentToolbar } from '@wordpress/blockEditor';
import {
	formatBold,
	formatItalic,
	formatCapitalize,
	formatLowercase,
	formatUppercase,
} from '@wordpress/icons';
const { useRef, useEffect, useState } = wp.element;

const Toolbar = ( props ) => {
	const { attributes, setAttributes } = props;
	const [ transformIcon, setTransformIcon ] = useState( formatCapitalize );

	useEffect( () => {
		const iconMap = {
			uppercase: formatUppercase,
			lowercase: formatLowercase,
		};

		setTransformIcon(
			iconMap?.[ attributes.style?.typography?.textTransform ] ||
				formatCapitalize
		);
	}, [ attributes.style ] );

	const isBold = () => {
		return (
			attributes.style?.typography?.fontWeight &&
			( attributes.style?.typography?.fontWeight
				?.toString()
				?.includes( 'bold' ) ||
				attributes.style?.typography?.fontWeight > 500 )
		);
	};
	const isItalic = () => {
		return attributes.style?.typography?.fontStyle == 'italic';
	};

	const updateTypography = ( key, val ) => {
		const newAttr = {
			...attributes.style?.typography,
			[ key ]: val,
		};
		if ( ! val ) {
			delete newAttr?.typography?.[ key ];
		}
		setAttributes( {
			style: {
				...attributes.style,
				typography: newAttr,
			},
		} );
	};

	return (
		<>
			<AlignmentToolbar
				value={ attributes.style?.typography?.textAlign }
				onChange={ ( val ) => setAttributes( { textAlign: val } ) }
			/>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					label="Letter Case"
					icon={ transformIcon }
					controls={ [
						{
							title: 'Normal',
							icon: formatCapitalize,
							isActive:
								! attributes.style?.typography?.textTransform,
							onClick: () =>
								updateTypography( 'textTransform', null ),
						},
						{
							title: 'UPPERCASE',
							isActive:
								attributes.style?.typography?.textTransform ===
								'uppercase',
							icon: formatUppercase,
							onClick: () =>
								updateTypography(
									'textTransform',
									'uppercase'
								),
						},
						{
							title: 'Capitalize',
							isActive:
								attributes.style?.typography?.textTransform ===
								'capitalize',
							icon: formatCapitalize,
							onClick: () =>
								updateTypography(
									'textTransform',
									'capitalize'
								),
						},
						{
							title: 'lowercase',
							isActive:
								attributes.style?.typography?.textTransform ===
								'lowercase',
							icon: formatLowercase,
							onClick: () =>
								updateTypography(
									'textTransform',
									'lowercase'
								),
						},
					] }
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					icon={ formatBold }
					label="Bold"
					isPressed={ isBold() }
					onClick={ () => {
						updateTypography( 'fontWeight', isBold() ? null : 700 );
					} }
				/>
				<ToolbarButton
					icon={ formatItalic }
					label="Italic"
					isPressed={ isItalic() }
					onClick={ () => {
						updateTypography(
							'fontStyle',
							isItalic() ? null : 'italic'
						);
					} }
				/>
			</ToolbarGroup>
		</>
	);
};
export default Toolbar;
