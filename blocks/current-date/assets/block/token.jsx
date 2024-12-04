const { Flex, FlexItem } = wp.components;

export default function RoundedLabelSVG( { label = '' } ) {
	return <div className="cmls-current-date-token">{ label }</div>;
	/*
	return (
		<div
			style={ {
				height: '100%',
				aspectRatio: '1/1',
				marginRight: '.5em',
			} }
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMid meet"
			>
				<g fill="none">
					<rect
						x="1.5"
						y="1.5"
						width="13"
						height="13"
						rx="3"
						ry="3"
						fill="#00588d"
						stroke="#00588d"
						strokeWidth="1"
					/>
					<text
						x="50%"
						y="50%"
						alignmentBaseline="central"
						textAnchor="middle"
						fill="#fff"
						fontSize="9" // Adjust font size as needed
						fontFamily="'Courier New', Courier, monospace" // Specify font for consistency
						fontWeight="600"
					>
						{ label }
					</text>
				</g>
			</svg>
		</div>
	);
	*/
}
