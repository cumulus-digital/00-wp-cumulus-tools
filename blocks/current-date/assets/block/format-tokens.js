export default [
	{
		label: 'Day',
		items: [
			{
				value: 'd',
				label: 'Day of month, leading zero (01-31)',
			},
			{
				value: 'j',
				label: 'Day of month, without leading zero (1-31)',
			},
			{
				value: 'S',
				label: 'Day number suffix (st, nd, rd, th)',
			},
			{
				value: 'D',
				label: 'Day, 3 letters (Mon-Sun)',
			},
			{
				value: 'l',
				label: 'Day, full name (Sunday-Saturday)',
			},
		],
	},
	{
		label: 'Month',
		items: [
			{
				value: 'm',
				label: 'Month, leading zero (01-12)',
			},
			{
				value: 'n',
				label: 'Month, without leading zero (1-12)',
			},
			{
				value: 'M',
				label: 'Month, 3 letters (Jan-Dec)',
			},
			{
				value: 'F',
				label: 'Month, full name (January-December)',
			},
		],
	},
	{
		label: 'Year',
		items: [
			{
				value: 'y',
				label: 'Year, 2 digits',
			},
			{
				value: 'Y',
				label: 'Year, 4 digits',
			},
		],
	},
	{
		label: 'Time',
		items: [
			{
				value: 'h',
				label: 'Hour, 12-hour format, with leading zero (01-12)',
			},
			{
				value: 'H',
				label: 'Hour, 24-hour format, with leading zero (00-23)',
			},
			{
				value: 'g',
				label: 'Hour, 12-hour format, without leading zero (1-12)',
			},
			{
				value: 'G',
				label: 'Hour, 24-hour format (0-23)',
			},
			{
				value: 'i',
				label: 'Minutes, leading zero (00-59)',
			},
			{
				value: 's',
				label: 'Seconds, leading zero (00-59)',
			},
			{
				value: 'T',
				label: 'Timezone abbreviation or GMT offset (EST, +05)',
			},
			{
				value: 'a',
				label: 'am or pm, lower case',
			},
			{
				value: 'A',
				label: 'AM or PM, upper case',
			},
		],
	},
	{
		label: 'Other',
		items: [
			{
				value: 'c',
				label: 'ISO-8601 date (2004-02-12T15:19:21+00:00)',
			},
			{
				value: 'r',
				label: 'RFC-822 date (Wed, 21 Dec 2000 15:19:21 +0000)',
			},
			{
				value: 'U',
				label: 'Unix timestamp',
			},
		],
	},
];
