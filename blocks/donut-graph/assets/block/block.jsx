//import CumulusIcon from '../../../../global/icons/Cumulus.jsx';
import DonutIcon from './icon.jsx';
import metadata from '../../block.json';
import { generateId } from 'Utilities/shortrandom.js';

import { formatBold, formatItalic } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	ColorPaletteControl,
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
import { useEffect } from '@wordpress/element';

const setDonutProps = ( attributes ) => {
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
	return ret;
};

const svgBlob = ( attributes ) => {
	return (
		<div
			className={ `donut-graph ${
				attributes.showPercentLabel ? 'show-label' : ''
			}` }
			data-percent={ attributes.percent }
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 100 100"
				version="1.1"
				alt={ `${ attributes.percent }%` }
				role="img"
				aria-labelledby={ `${ attributes.blockId }-title` }
			>
				<title id={ `${ attributes.blockId }-title` }>
					{ `A graph depicting ${ attributes.percent }%` }
				</title>
				<defs>
					<clipPath id="insideCircle">
						<circle
							id="circleMask"
							r="50"
							cx="50"
							cy="50"
							fill="#000000"
						></circle>
					</clipPath>
				</defs>
				<g style={ { clipPath: 'url(#insideCircle)' } }>
					<circle
						className="dg-visible"
						r="50"
						cx="50"
						cy="50"
					></circle>
					<circle
						className="dg-visible dg-bar"
						r="50"
						cx="50"
						cy="50"
					></circle>
				</g>
			</svg>
		</div>
	);
};

registerBlockType( metadata.name, {
	icon: DonutIcon,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const defaults = JSON.parse( JSON.stringify( metadata.attributes ) );

		useEffect( () => {
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
			console.log( newAttr );
			setAttributes( newAttr );
		};

		const blockProps = useBlockProps( setDonutProps( attributes ) );
		return (
			<div { ...blockProps }>
				<InspectorControls>
					<Panel>
						<PanelBody title="Graph Attributes">
							<ToggleControl
								label="Show Label"
								checked={ attributes.showPercentLabel }
								onChange={ ( val ) =>
									setAttributes( { showPercentLabel: val } )
								}
							/>

							<div>
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
							</div>

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

							<div>
								<AnglePickerControl
									label="Initial Position"
									value={ attributes.rotation }
									onChange={ ( val ) =>
										setAttributes( { rotation: val } )
									}
								/>
							</div>

							<RangeControl
								label="Percent Active"
								value={ attributes.percent }
								withInputField={ true }
								resetFallbackValue={ defaults.percent.default }
								min={ 1 }
								max={ 100 }
								onChange={ ( val ) =>
									setAttributes( { percent: val } )
								}
							/>

							<ColorPaletteControl
								label="Circle Base Color"
								value={ attributes.colorInactive }
								onChange={ ( val ) =>
									setAttributes( { colorInactive: val } )
								}
							/>

							<ColorPaletteControl
								label="Circle Active Color"
								value={ attributes.colorActive }
								onChange={ ( val ) =>
									setAttributes( { colorActive: val } )
								}
							/>
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
				{ svgBlob( props.attributes ) }
			</div>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save( setDonutProps( attributes ) );
		return <div { ...blockProps }>{ svgBlob( attributes ) }</div>;
	},
} );
