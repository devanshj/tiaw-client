import React from "react";
import { css } from "linaria";
import { rem, transparentize } from "polished";
import { colors } from "../../../styles";
import { ReactComponent as ErrorIcon } from "../../../assets/blueprintjs-icons/error-16px.svg"

const FormInput = ({ label, errorMessage = "", ...props }: {
	label: string,
	errorMessage?: string | false
} & React.InputHTMLAttributes<HTMLInputElement>) => {
	return <div className={css`margin-bottom: ${rem(15)};`}>
		<label className={css`
			display: block;
			font-size: ${rem(20)};
		`}>{label}</label>
		<input className={css`
			display: block;
			width: 100%;
			margin-top: ${rem(10)};

			background: ${transparentize(0.9, colors.black0)};
			border-radius: 2px;
			border: none;
			padding: ${rem(12)} ${rem(16)};
			font-size: ${rem(20)};
			color: ${colors.white0};

			&:focus {
				background: ${transparentize(0.8, colors.black0)};
			}
		`} {...props}/>
		<div className={css`
			color: ${colors.error};
			margin-top: ${rem(8)};
		`}>
			{errorMessage && <ErrorIcon className={css`height: 16px; margin-right: ${rem(8)}`}/>}
			{errorMessage}
		</div>
	</div>
}
export default FormInput;