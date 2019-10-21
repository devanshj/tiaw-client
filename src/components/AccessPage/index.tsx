import React, { useContext, useEffect, useState, useMemo } from "react";
import { ApiContext, IdentityContext } from "../../context";
import { Queuee, QueueForAccessor } from "../../api/types";
import { css } from "linaria";
import { rem } from "polished";
import Logo from "../Logo";
import FadeInUp from "../animation/FadeInUp";
import Button from "../ui/Button";
import { colors } from "../../styles";

const AccessPage = () => {
	let api = useContext(ApiContext);
	let identity = useContext(IdentityContext);
	let accessCode = useMemo(() => identity.value.code!, [identity]);
	let [queuees, setQueuees] = useState([] as Queuee[]);
	let [queue, setQueue] = useState<QueueForAccessor | null>(null);

	

	useEffect(() => {
		const updateQueuees = async () => {
			setQueuees(
				await api.remoteFunction("GET_QUEUEES_WITH_ACCESSCODE")({ accessCode })
			)
		};

		updateQueuees();
		api.remoteFunction("GET_QUEUE_WITH_ACCESSCODE")({ accessCode }).then(setQueue);
		api.remoteSubjectSubscribe("QUEUE_CHANGE")({ accessCode }, updateQueuees);
	}, [api, accessCode])

	return <div className={css`
		padding: ${rem(30)};
		height: 100%;
		display: flex;
		flex-direction: column;
	`}>
		<Logo className={css`margin-bottom: ${rem(30)}`}/>
		{queue && <>
			<h2 className={css`
				font-weight: 400;
				font-size: ${rem(30)};
			}`}>{queue.name}</h2>

			<p>PassCode: {queue.passCode}</p>
			<p>IdentityCode: {identity.value.code}</p>
			<a onClick={() => identity.set({ code: null })} className={css`
				display: block;
				margin-bottom: ${rem(15)};
				text-decoration: underline;
				cursor: pointer;
			`}>Logout</a>

			{queuees.length === 0
				? <p>No queuees</p>
				: <div className={css`overflow: auto;`}>{queuees.map((q, i) =>
					<div className={css`
						padding: ${rem(10)} 0;
						border-bottom: 1px solid rgba(0, 0, 0, 0.2);
						font-size: ${rem(18)};
						&:first-child { padding-top: 0; }
					`} key={i}>
						<div className={css`font-size: ${rem(24)}`}>{q.name}</div>
						<div className={css`opacity: 0.5;`}>
							{queue!.isQueueeStrengthable &&
								<>{q.strength} person{q.strength! > 1 ? "s" : ""}, </>}
							<a href={`tel:+91 ${q.mobile}`}>
								+91{q.mobile}
							</a>
						</div>
					</div>
				)}</div>
			}

			<div  className={css`
				position: fixed;
				bottom: ${rem(30)};
				right: ${rem(30)};
			`}>
				{queuees.length > 0 && <FadeInUp>
					<Button
						onClick={() => {
							setQueuees(([, ...q]) => q);
							api.remoteFunction("DEQUEUE_WITH_ACCESSCODE")({ accessCode });
						}}
						label="Take next"
						className={css`
							--bg-color: ${colors.primary};
							--fg-color: ${colors.white0};
						`}/>
				</FadeInUp>}
			</div>
		</>}
	</div>;
}
export default AccessPage;