import React, { useState, useContext } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import { ReactComponent as ArrowRightIcon } from "../../assets/blueprintjs-icons/arrow-right-16px.svg";
import { css } from "linaria";
import { rem } from "polished";
import FadeInDown from "../animation/FadeInDown";
import { transitionDuration } from "../../styles";
import FadeInUp from "../animation/FadeInUp";
import { ApiContext, IdentityContext } from "../../context";

const IdentityPage = () => {
	let [identityCode, setIdentityCode] = useState("");
	let api = useContext(ApiContext);
	let identity = useContext(IdentityContext);
	let [codeVerification, setCodeVerification] = useState<
		| "INITIAL"
		| "ERROR"
		| "SUCCESS"
		| "VERIFYING"
	>("INITIAL");

	return <form onSubmit={async event => {
		event.preventDefault();
		setCodeVerification("VERIFYING");
		let type = await api.remoteFunction("VERIFY_IDENTITYCODE")({ identityCode })
		if (type === "INVALID") {
			setCodeVerification("ERROR");
		} else {
			identity.set({ code: identityCode, type });
		}
	}}>
		<FadeInDown delay={transitionDuration}>
			<FormInput
				label="Identity code"
				value={identityCode}
				errorMessage={
					codeVerification === "ERROR"
						? "No such identity code found"
						: false
				}
				onChange={e => setIdentityCode(e.target.value)}
				required/>
		</FadeInDown>

		<div  className={css`
			position: fixed;
			bottom: ${rem(30)};
			right: ${rem(30)};
		`}>
			<FadeInUp delay={transitionDuration}>
				<Button
					label={codeVerification === "VERIFYING" ? "Verifying..." : "Verify"}
					disabled={codeVerification === "VERIFYING"}
					after={
						codeVerification !== "VERIFYING" && <ArrowRightIcon className={css`
							height: ${rem(16)};
							margin-left: ${rem(10)};
						`}/>
					}/>
			</FadeInUp>
		</div>
	</form>
}
export default IdentityPage;