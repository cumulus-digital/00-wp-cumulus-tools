/**
 * Based on WP's own color gradient dropdown
 * https://github.com/WordPress/gutenberg/blob/6b1f4a70008354c9e6665a3a37124100180ecaee/packages/block-editor/src/components/colors-gradients/dropdown.js
 */

import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	__experimentalHStack as HStack,
	FlexItem,
	ColorIndicator,
	Dropdown,
} from '@wordpress/components';
import { __experimentalColorGradientControl as ColorGradientControl } from '@wordpress/block-editor';

const ColorControl = ( props ) => {
	const dropdownPosition = 'bottom left';
	const { settings } = props;
	return (
		<ItemGroup
			isBordered
			isSeparated
			className="block-editor-panel-color-gradient-settings__item-group"
		>
			{ settings.map(
				( setting, index ) =>
					setting && (
						<Dropdown
							key={ index }
							position={ dropdownPosition }
							className="block-editor-panel-color-gradient-settings__dropdown"
							contentClassName="block-editor-panel-color-gradient-settings__dropdown-content"
							renderToggle={ ( { isOpen, onToggle } ) => {
								return (
									<Item
										onClick={ onToggle }
										className={ [
											'block-editor-panel-color-gradient-settings__item',
											isOpen ? 'is-open' : '',
										].filter( ( v ) => v ) }
									>
										<HStack justify="flex-start">
											<ColorIndicator
												className="block-editor-panel-color-gradient-settings__color-indicator"
												colorValue={
													setting.gradientValue ??
													setting.colorValue
												}
											/>
											<FlexItem>
												{ setting.label }
											</FlexItem>
										</HStack>
									</Item>
								);
							} }
							renderContent={ () => (
								<ColorGradientControl
									showTitle={ setting.label }
									{ ...setting }
								/>
							) }
						/>
					)
			) }
		</ItemGroup>
	);
};
export default ColorControl;
