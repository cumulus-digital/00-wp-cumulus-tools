import icon from './icon';
import TokenIcon from './token';
import metadata from '../../block.json';
import formatTokens from './format-tokens.js';

const { registerBlockType } = wp.blocks;
const { useBlockProps, BlockControls, InspectorControls } = wp.blockEditor;
const {
	Flex,
	FlexItem,
	PanelBody,
	TextControl,
	DropdownMenu,
	MenuGroup,
	MenuItem,
} = wp.components;
const ServerSideRender = wp.serverSideRender;

registerBlockType( metadata.name, {
	...metadata,
	icon,
	edit: ( props ) => {
		const blockProps = useBlockProps();
		const { attributes, setAttributes } = props;

		const TokenDropdown = () => {
			return (
				<>
					<DropdownMenu
						icon="insert"
						label="Insert Basic Token"
						children={ () => {
							return formatTokens.map( ( tokenGroup ) => {
								return (
									<MenuGroup label={ tokenGroup.label }>
										{ tokenGroup.items.map( ( token ) => {
											return (
												<MenuItem
													key={ token.value }
													icon={
														<TokenIcon
															label={
																token.value
															}
														/>
													}
													iconPosition="left"
													onClick={ () => {
														setAttributes( {
															format: `${ attributes.format }${ token.value }`,
														} );
													} }
												>
													{ token.label }
												</MenuItem>
											);
										} ) }
									</MenuGroup>
								);
							} );
						} }
					/>
					<style>{ `
						.cmls-current-date-token {
							background-color: #00588d;
							color: #fff;
							border-radius: 3px;
							line-height: 1;
							margin-right: .5em;
							padding: .4em;
							font-family: monospace;
					` }</style>
				</>
			);
		};

		return (
			<span { ...blockProps }>
				<InspectorControls>
					<PanelBody title="Date Format">
						<Flex gap={ 1 } align="top">
							<FlexItem isBlock={ true }>
								<TextControl
									__next40pxDefaultSize={ true }
									value={ attributes.format }
									onChange={ ( val ) =>
										setAttributes( { format: val } )
									}
								/>
							</FlexItem>
							<FlexItem>
								<TokenDropdown />
							</FlexItem>
						</Flex>
						<p>
							For details on date formatting and additional
							tokens, see&nbsp;
							<a
								href="https://www.php.net/manual/en/datetime.format.php"
								target="_blank"
								rel="noopener noreferrer"
							>
								PHP DateTime Format
							</a>
						</p>
						<p>
							Literal text may be embedded in the format by
							surrounding it with square brackets, for example:
							[Today]
						</p>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</span>
		);
		/*
		return (
			<div { ...blockProps }>
				<InspectorControls>
					<PanelBody title="Date Format">
						<FormTokenField
							label="Date Format"
							value={ attributes.format }
							options={ formatTokens }
							onChange={ ( val ) =>
								setAttributes( { format: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		);
		*/
	},
	/*
	save: () => {
		const blockProps = useBlockProps.save();
		return <div { ...blockProps }>Testing!</div>;
	},
	*/
} );
