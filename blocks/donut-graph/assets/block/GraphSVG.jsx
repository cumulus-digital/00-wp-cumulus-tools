const svgBlob = function svgBlob( attributes ) {
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
export default svgBlob;
