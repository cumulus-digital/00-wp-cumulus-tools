//import CumulusIcon from '../../../../global/icons/Cumulus.jsx';
import DonutIcon from './icon.jsx';
import metadata from '../../block.json';
import { generateId } from 'Utilities/shortrandom.js';
import GraphSVG from './GraphSVG';
import PanelRow from 'Components/PanelRow';

import { formatBold, formatItalic } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	withColors,
	PanelColorSettings,
	getColorClassName,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	AnglePickerControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useEffect, useMemo } from '@wordpress/element';

const getDonutProps = ( { attributes, textColor } ) => {
	let ret = {};
	ret.style = {
		'--width': '' + attributes.width,
		'--percent': '' + attributes.percent,
		'--rotation': '' + attributes.rotation + 'deg',
		'--stroke-width': '' + attributes.strokeWidth,
		'--color-inactive': '' + attributes.colorInactive,
		'--color-active': '' + attributes.colorActive,
	};
	ret[ 'data-width' ] = attributes.width;
	ret[ 'data-percent' ] = attributes.percent;
	ret[ 'data-stroke-width' ] = attributes.strokeWidth;
	ret[ 'data-color-inactive' ] = attributes.colorInactive;
	ret[ 'data-color-active' ] = attributes.colorActive;
	ret[ 'data-rotation' ] = attributes.rotation + 'deg';

	const textClass = getColorClassName( 'color', textColor?.slug );
	ret.className = [
		textClass,
		textClass || attributes?.style?.color?.text ? 'has-text-color' : null,
	].filter( ( v ) => v );

	return ret;
};

registerBlockType( metadata.name, {
	icon: DonutIcon,
	edit: withColors( 'textColor' )( ( props ) => {
		const { attributes, setAttributes } = props;
		const defaults = JSON.parse( JSON.stringify( metadata.attributes ) );
		const { textColor, setTextColor } = props;

		useMemo( () => {
			window._wpLoadBlockEditor.then( () => {
				generateId( {
					prefix: 'cgcg-',
					attributes: attributes,
					setAttributes: setAttributes,
					attribute: 'blockId',
				} );
			} );
		}, [] );

		const updateTypography = ( key, val ) => {
			let newTypo = {};
			newTypo[ key ] = val;
			let newAttr = {
				...attributes,
				style: {
					...attributes.style,
					typography: {
						...attributes.style?.typography,
						...newTypo,
					},
				},
			};
			if ( ! val ) {
				delete newAttr.style.typography[ key ];
			}
			setAttributes( newAttr );
		};

		const colorSettings = useMemo( () => {
			const settings = [
				{
					label: 'Base',
					value: attributes.colorInactive,
					onChange: ( val ) =>
						setAttributes( { colorInactive: val } ),
				},
				{
					label: 'Filled',
					value: attributes.colorActive,
					onChange: ( val ) => setAttributes( { colorActive: val } ),
				},
			];
			if ( attributes.showPercentLabel ) {
				settings.unshift( {
					label: 'Label Text',
					value: textColor.color,
					onChange: setTextColor,
				} );
			}
			return settings;
		}, [ attributes, textColor ] );

		const donutProps = getDonutProps( props );
		const blockProps = useBlockProps( donutProps );

		return (
			<div { ...blockProps }>
				<InspectorControls>
					<PanelColorSettings
						title="Graph Colors"
						colorSettings={ colorSettings }
					/>
					<Panel>
						<PanelBody title="Graph Attributes">
							<PanelRow>
								<ToggleControl
									label="Show Label"
									checked={ attributes.showPercentLabel }
									onChange={ ( val ) =>
										setAttributes( {
											showPercentLabel: val,
										} )
									}
								/>
							</PanelRow>

							<PanelRow>
								<UnitControl
									label="Graph Size"
									labelPosition="side"
									isUnitSelectTabbable
									value={ attributes.width }
									units={ [
										{
											value: 'px',
											label: 'px',
											default: 100,
										},
										{
											value: '%',
											label: '%',
											default: 100,
										},
										{
											value: 'em',
											label: 'em',
											default: 100,
										},
										{
											value: 'rem',
											label: 'rem',
											default: 100,
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { width: val } )
									}
								/>
							</PanelRow>
							<PanelRow>
								<RangeControl
									label="Stroke Width"
									help="Percentage of the graph size."
									withInputField={ true }
									value={ attributes.strokeWidth }
									resetFallbackValue={
										defaults.strokeWidth?.default
									}
									min={ 1 }
									max={ 50 }
									onChange={ ( val ) =>
										setAttributes( { strokeWidth: val } )
									}
								/>
							</PanelRow>

							<PanelRow>
								<AnglePickerControl
									label="Angle"
									value={ attributes.rotation }
									onChange={ ( val ) =>
										setAttributes( { rotation: val } )
									}
								/>
							</PanelRow>

							<PanelRow>
								<RangeControl
									label="Percent Active"
									value={ attributes.percent }
									withInputField={ true }
									resetFallbackValue={
										defaults.percent.default
									}
									min={ 1 }
									max={ 100 }
									onChange={ ( val ) =>
										setAttributes( { percent: val } )
									}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>

				{ attributes.showPercentLabel && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ formatBold }
								label="Bold"
								isPressed={
									attributes.style?.typography?.fontWeight &&
									attributes.style?.typography?.fontWeight ==
										700
								}
								onClick={ () =>
									updateTypography(
										'fontWeight',
										attributes.style?.typography
											?.fontWeight == 700
											? null
											: 700
									)
								}
							/>
							<ToolbarButton
								icon={ formatItalic }
								label="Italic"
								isPressed={
									attributes.style?.typography?.fontStyle &&
									attributes.style?.typography?.fontStyle !==
										'normal'
								}
								onClick={ () =>
									updateTypography(
										'fontStyle',
										attributes.style?.typography
											?.fontStyle === 'italic'
											? null
											: 'italic'
									)
								}
							/>
						</ToolbarGroup>
					</BlockControls>
				) }
				{ GraphSVG( attributes ) }
			</div>
		);
	} ),
	save: ( props ) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save( getDonutProps( props ) );
		return <div { ...blockProps }>{ GraphSVG( attributes ) }</div>;
	},
} );
