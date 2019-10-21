import React, { useState, useEffect, useContext } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { ReactComponent as ArrowRightIcon } from "../../assets/blueprintjs-icons/arrow-right-16px.svg";
import { css } from "linaria";
import { rem } from "polished";
import FadeInDown from "../animation/FadeInDown";
import { transitionDuration } from "../../styles";
import FadeInUp from "../animation/FadeInUp";
import { ApiContext, IdentityContext } from "../../context";
import { Queue } from "../../api/types";

// TODO: animate this page

const EnterQueuePage = () => {
	let [passCode, setPassCode] = useState("");
	let [name, setName] = useState("");
	let [mobile, setMobile] = useState("");
	let [strength, setStrength] = useState<number | null>(null);
	let api = useContext(ApiContext);
	let identity = useContext(IdentityContext);

	let [passCodeVerification, setPassCodeVerification] = useState<
		| "INITIAL"
		| "ERROR"
		| "SUCCESS"
		| "VERIFYING"
	>("INITIAL");
	let [queue, setQueue] = useState<Queue | null>(null);
	let [isEntering, setIsEntering] = useState(false);

	return <div className={css`overflow: auto; height: 100%;`}>
		{queue === null && <form onSubmit={async event => {
			event.preventDefault();
			setPassCodeVerification("VERIFYING");
			let queue = await api.remoteFunction("GET_QUEUE_WITH_PASSCODE")({ passCode });
			setQueue(queue);
			setPassCodeVerification(queue ? "SUCCESS" : "ERROR");
		}}>
			<FadeInDown delay={transitionDuration}>
				<FormInput
					label="Queue Passcode"
					errorMessage={
						passCodeVerification === "ERROR"
							? "No queues with this passcode found"
							: false
					}
					value={passCode}
					onChange={e => setPassCode(e.target.value)}
					required/>
			</FadeInDown>

			<div  className={css`
				position: fixed;
				bottom: ${rem(30)};
				right: ${rem(30)};
			`}>
				<FadeInUp>
					<Button
						label={passCodeVerification === "VERIFYING" ? "Verifying..." : "Verify"}
						disabled={passCodeVerification === "VERIFYING"}
						after={
							!(passCodeVerification === "VERIFYING") && <ArrowRightIcon className={css`
								height: ${rem(16)};
								margin-left: ${rem(10)};
							`}/>
						}/>
				</FadeInUp>
			</div>
		</form>}

		{queue !== null && <form onSubmit={async event => {
			event.preventDefault();
			setIsEntering(true);
			let { tokenCode } = await api.remoteFunction("INSERT_QUEUEE_WITH_PASSCODE")({
				name,
				passCode,
				mobile,
				strength
			});
			identity.set({
				code: tokenCode,
				type: "TOKEN"
			});
		}}>
			<h2 className={css`font-weight: 500; margin-bottom: ${rem(10)}`}>{queue.name}</h2>
			<FadeInUp>
				<FormInput
					label="Name"
					value={name}
					onChange={e => setName(e.target.value)}
					required/>
			</FadeInUp>
			<FadeInUp delay={transitionDuration * 0.5}>
				<FormInput
					label="Mobile"
					value={mobile}
					pattern="[0-9]{10}"
					onChange={e => setMobile(e.target.value)}/>
			</FadeInUp>
			{queue.isQueueeStrengthable && <FadeInUp delay={transitionDuration}>
				<FormInput
					label="Strength"
					type="number"
					min={1}
					value={strength || ""}
					onChange={e => setStrength(Number(e.target.value))}
					required/>
			</FadeInUp>}

			<div  className={css`
				position: fixed;
				bottom: ${rem(30)};
				right: ${rem(30)};
			`}>
				<FadeInUp delay={transitionDuration}>
					<Button
						label={isEntering ? "Entering..." : "Enter"}
						disabled={isEntering}
						after={
							!isEntering && <ArrowRightIcon className={css`
								height: ${rem(16)};
								margin-left: ${rem(10)};
							`}/>
						}/>
				</FadeInUp>
			</div>
		</form>}
	</div>
}
export default EnterQueuePage;