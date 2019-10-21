import React, { useState, useContext } from "react";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import Button from "../ui/Button";
import { ReactComponent as ArrowRightIcon } from "../../assets/blueprintjs-icons/arrow-right-16px.svg";
import { css } from "linaria";
import { rem } from "polished";
import FadeInDown from "../animation/FadeInDown";
import { transitionDuration } from "../../styles";
import FadeInUp from "../animation/FadeInUp";
import { ApiContext, IdentityContext } from "../../context";

const CreateQueuePage = () => {
	let [name, setName] = useState("");
	let api = useContext(ApiContext);
	let identity = useContext(IdentityContext);
	let [isQueueeStrengthable, setIsQueueeStrengthable] = useState(false);
	let [isCreating, setIsCreating] = useState(false);

	return <form onSubmit={event => {
		event.preventDefault();
		setIsCreating(true);
		api.remoteFunction("INSERT_QUEUE")({
			name, isQueueeStrengthable
		}).then(({ accessCode }) => {
			identity.set({ code: accessCode, type: "ACCESS" });
		})
	}}>
		<FadeInDown delay={transitionDuration}>
			<FormInput
				label="Name"
				value={name}
				onChange={e => setName(e.target.value)}
				required/>
		</FadeInDown>
		
		<FadeInDown delay={transitionDuration*1.5}>
			<FormSelect
				label="Can queuee be with a group?"
				value={Number(isQueueeStrengthable)}
				onChange={v => setIsQueueeStrengthable(!!v)}
				options={["No", "Yes"]}/>
		</FadeInDown>

		<div  className={css`
			position: fixed;
			bottom: ${rem(30)};
			right: ${rem(30)};
		`}>
			<FadeInUp delay={transitionDuration}>
				<Button
					label={isCreating ? "Creating..." : "Create"}
					disabled={isCreating}
					after={
						// TODO: animate this
						!isCreating && <ArrowRightIcon className={css`
							height: ${rem(16)};
							margin-left: ${rem(10)};
						`}/>
					}/>
			</FadeInUp>
		</div>
	</form>
}
export default CreateQueuePage;