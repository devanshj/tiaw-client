import React from "react";
import { css } from "linaria";
import { rem, transparentize } from "polished";
import { colors } from "../../../styles";

const Button = ({ label, after = null, ...props }: {
	label: string,
	after?: React.ReactElement | null | false | undefined
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return <button
		{...props}
		className={css`
			background: ${colors.white0};
			color: ${colors.primary};
			border: none;
			padding: ${rem(12)} ${rem(16)};
			font-family: Josefin Sans;
			font-size: ${rem(20)};
			border-radius: 4px;
			line-height: 1;
			font-weight: 600;
			text-transform: uppercase;
			box-shadow: 0 15px 25px ${transparentize(0.45, colors.white0)};
			cursor: pointer;

			display: flex;
			justify-content: center;
			align-items: center;

			&[disabled] {
				opacity: 0.7;
			}
		` + " " + props.className}>
		<span className={css`position: relative; top: 0.12em;`}>
			{label}
		</span>
		{after}
	</button>
}
export default Button;