import React from "react";
import { css } from "linaria"
import { colors } from "../../styles";
import { rem } from "polished";

const SplashScreen = () => {
	return <div className={css`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		background-color: ${colors.primary};
		color: ${colors.white0};
		font-size: ${rem(20)};
		padding: ${rem(30)};
	`}>
		Hang in tight establishing a connection with the server...
	</div>
}
export default SplashScreen;