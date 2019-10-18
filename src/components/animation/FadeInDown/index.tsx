import React, { useEffect, useState } from "react";
import { transitionDuration } from "../../../styles";

const FadeInDown = ({ yOffset = 10, delay = 0, duration = transitionDuration, children }: {
	yOffset?: number,
	delay?: number,
	duration?: number,
	children: React.ReactElement | React.ReactElement[]
}) => {

	let [style, setStyle] = useState({
		opacity: 0,
		transform: `translateY(-${yOffset}px)`
	})

	useEffect(() => {
		setStyle({
			opacity: 1,
			transform: `translateY(0px)`
		})
	}, []);

	return <div style={{ transition: `ease-in ${duration}s`, transitionDelay: delay + "s", ...style }}>
		{children}
	</div>
}
export default FadeInDown;