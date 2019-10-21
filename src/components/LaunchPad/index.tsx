import React, { ReactElement, useState, useRef, useEffect } from "react";
import { css } from "linaria";
import { colors, transitionDuration } from "../../styles";
import { rem, transparentize } from "polished";
import { ReactComponent as PlusIcon } from "../../assets/blueprintjs-icons/plus-16px.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/blueprintjs-icons/arrow-right-16px.svg";
import { ReactComponent as LockIcon } from "../../assets/material-lock.svg";
import { ReactComponent as QueueSvg } from "../../assets/queue.svg";
import ArrowIcon from "../ui/ArrowIcon";
import CreateQueuePage from "./CreateQueuePage";
import EnterQueuePage from "./EnterQueuePage";
import IdentityPage from "./IdentityPage";
import Logo from "../Logo";

type ActionPage =
	| "ENTER_QUEUE"
	| "CREATE_QUEUE"
	| "IDENTITY_CODE"

const LaunchPad = () => {
	let [currentPage, setCurrentPage] = useState<"INITIAL" | ActionPage>("INITIAL");

	const safeNavigateTo = (page: ActionPage) => {
		if (currentPage !== "INITIAL") return;
		setCurrentPage(page);
		window.history.pushState({ currentPage: page }, document.title, "");
	}

	useEffect(() => {
		window.history.replaceState({ currentPage }, document.title, "");
		window.addEventListener("popstate", ({ state }) => {
			setCurrentPage(state.currentPage);
		});
	}, [currentPage])

	

	return <div className={css`
		padding: ${rem(30)}
		min-height: 100%;

		background-color: ${colors.white0};
		.dark & {
			background-color: ${colors.black0};
		}
		overflow: hidden;
	`}>
		<Header 
			isBackable={currentPage !== "INITIAL"}
			onBack={() => window.history.back()}/>
		<QueueAction
			icon={<ArrowRightIcon className={css`width: 16px`}/>}
			title="Enter a Queue"
			isActive={currentPage === "ENTER_QUEUE"}
			onClick={() => safeNavigateTo("ENTER_QUEUE")} />
		<QueueAction
			icon={<PlusIcon className={css`width: 16px`}/>}
			title="Create a Queue"
			isActive={currentPage === "CREATE_QUEUE"}
			onClick={() => safeNavigateTo("CREATE_QUEUE")} />
		<Action
			title="I have an identity code"
			icon={<LockIcon className={css`height: 60px`}/>}
			isActive={currentPage === "IDENTITY_CODE"}
			onClick={() => safeNavigateTo("IDENTITY_CODE")}
			/>
		<div className={css`
			position: absolute;
			left: 0;
			right: 0;
			padding: 0 ${rem(30)};
			top: ${rem(100)};
			z-index: 4;
			color: ${colors.white0}
		`} style={{ bottom: ["CREATE_QUEUE", "ENTER_QUEUE", "IDENTITY_CODE"].includes(currentPage) ? 0 : ""}}>
			{currentPage === "CREATE_QUEUE" && (
				<CreateQueuePage/>
			)}
			{currentPage === "ENTER_QUEUE" && (
				<EnterQueuePage/>
			)}
			{currentPage === "IDENTITY_CODE" && (
				<IdentityPage/>
			)}
		</div>
	</div>
}

const Action = ({ icon, title, isActive = false, ...props  }: {
	icon: React.ReactElement,
	title: string,
	isActive?: boolean
} & React.HTMLAttributes<HTMLDivElement>) => {

	let easingStyle = {
		transitionEasing: isActive ? "ease-out" : "ease-in"
	}

	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!divRef.current) return;

		divRef.current.style.setProperty(
			"offset-path",
			`path('
				${"M 0 0" +
				" A " + 24 + " " + divRef.current.offsetTop +
				" 0 0 0 " + 24 + " -" + divRef.current.offsetTop}
			')`.replace(/(\n|\s{2,})/g, "")
		)
	}, [])

	return <div ref={divRef} className={css`
		display: flex;
		margin-bottom: ${rem(20)};
		height: ${rem(20*2 + 60)};

		padding: ${rem(20)};
		border-radius: calc((1 - var(--is-active)) * ${rem(8)});
		background-color: ${colors.primary};
		color: ${colors.white0};
		box-shadow: 0 15px 25px ${transparentize(0.45, colors.primary)};
		.dark & {
			background-color: ${colors.black1};
			color: ${colors.primary};
			box-shadow: 0 15px 25px ${transparentize(0.45, colors.black1)};
		}
		cursor: pointer;
		offset-rotate: 0deg;
		offset-distance: calc(var(--is-active) * 100%);
		
		transform-origin: 0 0;
		transition: all ease-in ${transitionDuration}s;

		font-family: Raleway;
		position: relative;
		z-index: var(--is-active);

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: calc(var(--is-active) * ${rem(-24-30)});
			right: calc(var(--is-active) * ${rem(-30)});
			height: calc(
				(1 - var(--is-active)) * 100% +
				var(--is-active) * var(--window-inner-height)
			);
			border-radius: calc(
				(1 - var(--is-active)) * ${rem(8)} +
				var(--is-active) * 0px
			);
			background: ${colors.primary};
			transition: all ease-in ${transitionDuration}s;
		}
	`} style={{
		"--is-active": Number(isActive),
		cursor: isActive ? "default" : "",
		...easingStyle
	}} {...props}>
		<div className={css`
			width: ${rem(54)}
			height: ${rem(60)}
			flex-shrink: 0;
			position: relative;
			z-index: 1;
		`}>
			{icon}
		</div>
		<h2 className={css`
			margin-left: ${rem(10)};
			margin-top: calc(var(--is-active) * ${rem(7)} + ${rem(5)});
			transition: all ease-in ${transitionDuration}s;
			font-weight: 500;
			line-height: 1;
			position: relative;
			z-index: 1;
		`} style={easingStyle}>
			 {title}
		</h2>
	</div>
}

const QueueAction = (...[{ title, icon, ...props }]: Parameters<typeof Action>) => <Action
	title={title}
	icon={<QueueActionIcon className={css`flex-shrink: 0;`}>
		{icon}
	</QueueActionIcon>}
	{...props}
/>

const QueueActionIcon = ({ children, ...props }: { children: ReactElement } & React.HTMLAttributes<HTMLDivElement>) => {
	return <div {...props} className={props.className + " " +  css`
		position: relative;
		padding-right: ${rem(8)};
		height: 100%;
		svg { display: block }
	`}>
		<QueueSvg className={css`
			height: 100%;
		`}/>
		<div className={css`
			--fg-color: ${colors.primary};
			--bg-color: ${colors.white0};
			.dark & {
				--fg-color: ${colors.white0};
				--bg-color: ${colors.primary};
			}

			position: absolute;
			right: 0;
			transform: translateY(-100%);
			height: ${rem(26)};
			width: ${rem(26)};

			background-color: var(--bg-color);
			border-radius: 100%;

			display: flex;
			justify-content: center;
			align-items: center;

			svg { color: var(--fg-color); }
		`}>
			{children}
		</div>
	</div>
}

const Header = ({ isBackable, onBack = () => {} }: { isBackable: boolean, onBack?: () => void }) => {

	let easingStyle = {
		transitionEasing: isBackable ? "ease-out" : "ease-in"
	};

	return <>
		<ArrowIcon
			className={css`
				margin-right: ${rem(12)};
				opacity: var(--is-backable);
				transform: translateX(calc((1 - var(--is-backable)) * -100%));
				transition: all ease-in ${transitionDuration}s;
				position: fixed;
				left: ${rem(30)};
				top: ${rem(30)};
				z-index: 2;
				--color: ${colors.white0};
			`}
			onClick={onBack}
			style={{
				"--width": rem(24),
				"--thickness": rem(3),
				"--is-backable": Number(isBackable),
				transitiondelay: !isBackable ? `${transitionDuration/2}s` : "",
				...easingStyle
			}}/>
		<Logo className={css`margin-bottom: ${rem(30)}`}/>
	</>
}

export default LaunchPad;