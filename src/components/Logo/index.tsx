import React from "react";
import { css } from "linaria"
import { rem } from "polished"
import { colors } from "../../styles"

const Logo = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
	return <h1 {...props} className={css`
		display: block;
		font-size: ${rem(56)};

		/* optical alignment */
		margin-left: -2px;
		margin-top: -0.11em;
		height: 0.75em;

		font-weight: 400;
		font-family: "Josefin Sans";
		user-select: none;
		color: ${colors.primary};
	` + " " + props.className}>
		TIAW
	</h1>
}
export default Logo;