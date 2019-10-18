import React from "react";
import { css } from "linaria";

const ArrowIcon = (props: React.HTMLAttributes<HTMLDivElement>) => {
	return <div
		{...props}
		className={props.className + " " + css`
			--width: 16px;
			--height: var(--width);
			--thickness: 2px;
			--color: currentColor;

			--direction-left: 0;
			--direction-top: 1;
			--direction-right: 2;
			--direction-bottom: 3;
			--angle: calc(
				var(--direction, 0) * 90deg
			);

			width: var(--width);
			height: var(--height);
			transform: rotate(var(--angle));

			position: relative;
			overflow: visible;

			&::before, &::after {
				content: "";
				position: absolute;
				height: var(--thickness);
				max-width: calc(var(--height) * ${Math.SQRT1_2});
				width: calc(
					var(--width) * ${Math.SQRT1_2} + 
					var(--thickness) * ${Math.SQRT1_2}
				);
				top: 50%;
				left: calc(var(--thickness) / 2 * ${Math.SQRT1_2});
				margin-top: calc(-1 * var(--thickness) / 2);

				background: var(--color);
			}

			&::before {
				transform:
					rotate(-45deg)
					translateX(
						calc(-1 * var(--thickness) * ${Math.SQRT1_2})
					);
				transform-origin: left top;
			}

			&::after {
				transform:
					rotate(45deg)
					translateX(
						calc(-1 * var(--thickness) * ${Math.SQRT1_2})
					);
				transform-origin: left bottom;
			}
		`}>
			<div className={css`
				position: absolute;
				height: var(--thickness);
				width: calc(
					var(--width) - 
					var(--thickness) / 2 * ${Math.SQRT1_2}
				);
				right: 0;
				top: 50%;
				left: calc(var(--thickness) / 2 * ${Math.SQRT1_2});
				margin-top: calc(-1 * var(--thickness) / 2);

				background: var(--color);
			`}/>
	</div>
}
export default ArrowIcon;