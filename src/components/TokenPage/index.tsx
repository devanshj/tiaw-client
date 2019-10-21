import React, { useContext, useEffect, useState, useMemo } from "react";
import { ApiContext, IdentityContext } from "../../context";
import { Queue } from "../../api/types";
import { css } from "linaria";
import { rem } from "polished";
import Logo from "../Logo";

const TokenPage = () => {
	let api = useContext(ApiContext);
	let identity = useContext(IdentityContext);
	let tokenCode = useMemo(() => identity.value.code!, [identity]);
	let [queue, setQueue] = useState<Queue | null>(null);
	let [position, setPosition] = useState<number | null>(null);

	useEffect(() => {
		api.remoteFunction("GET_QUEUE_WITH_TOKENCODE")({ tokenCode }).then(setQueue)
		api.remoteSubjectSubscribe("QUEUEE_POSITION")({ tokenCode }, setPosition);
	}, [api, tokenCode])

	return <div className={css`
		padding: ${rem(30)};
		height: 100%;
		display: flex;
		flex-direction: column;
	`}>
		<Logo className={css`margin-bottom: ${rem(30)}`}/>
		{queue && position !== null && <>
			<h2 className={css`
				font-weight: 400;
				font-size: ${rem(40)};
			}`}>{
				position === 0 ? "It's your turn!" :
				position === 1 ? "You are next" :
				"You are " + position + (
					position === 2 ? "nd" :
					position === 3 ? "rd" :
					"th"
				)
			}</h2>
			<h3 className={css`
				font-weight: 400;
				font-size: ${rem(20)};
				margin-bottom: ${rem(15)};				
			`}>{queue.name}</h3>

			<p>IdentityCode: {tokenCode}</p>
			<a onClick={() => identity.set({ code: null })} className={css`
				display: block;
				margin-bottom: ${rem(15)};
				text-decoration: underline;
				cursor: pointer;
			`}>Logout</a>
		</>}
	</div>;
}
export default TokenPage;