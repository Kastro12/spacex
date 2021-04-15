import React from 'react';

const CustomIcons = (icon) => {
	switch (icon.icon) {
		case 'arrowLeft': {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 6.364 11.364">
					<g id="Group_2562" data-name="Group 2562" transform="translate(-253.818 -816.318)">
						<line
							id="Line_6100"
							data-name="Line 6100"
							x2="7"
							transform="translate(254.525 817.025) rotate(45)"
							fill="none"
							stroke="#fff"
							strokeLinecap="round"
							strokeWidth="1"
						/>
						<line
							id="Line_6101"
							data-name="Line 6101"
							x2="7"
							transform="translate(254.525 826.975) rotate(-45)"
							fill="none"
							stroke="#fff"
							strokeLinecap="round"
							strokeWidth="1"
						/>
					</g>
				</svg>
			);
		}
		case 'arrowRight': {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 6.364 11.364">
					<g id="Group_2563" data-name="Group 2563" transform="translate(0.707 0.707)">
						<line
							id="Line_6100"
							data-name="Line 6100"
							x2="7"
							transform="translate(4.95 0) rotate(135)"
							fill="none"
							stroke="#fff"
							strokeLinecap="round"
							strokeWidth="1"
						/>
						<line
							id="Line_6101"
							data-name="Line 6101"
							x2="7"
							transform="translate(4.95 9.95) rotate(-135)"
							fill="none"
							stroke="#fff"
							strokeLinecap="round"
							strokeWidth="1"
						/>
					</g>
				</svg>
			);
		}
	}
};

export default CustomIcons;
