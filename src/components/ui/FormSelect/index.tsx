import React from "react";
import { css } from "linaria";
import { rem, transparentize } from "polished";
import { colors } from "../../../styles";
import downArrow from "./down-arrow.svg";

const FormSelect = ({ label, options, value = 0, onChange = () => {}, ...props }: {
	label: string,
	options: string[],
	value?: number,
	onChange?: (value: number) => void
} & Omit<React.AllHTMLAttributes<HTMLSelectElement>, "onChange">) => {
	return <div className={css`margin-bottom: ${rem(15)};`}>
		<label className={css`
			display: block;
			font-size: ${rem(20)};
		`}>{label}</label>
		<select className={css`
			display: block;
			width: 100%;
			margin-top: ${rem(10)};

			background-color: ${transparentize(0.9, colors.black0)};
			border-radius: 2px;
			border: none;
			padding: ${rem(12)} ${rem(16)};
			font-size: ${rem(20)};
			color: ${colors.white0};

			appearance: none;
			background-image: url(${downArrow});
			background-repeat: no-repeat;
			background-size: 10px;
			background-position: calc(100% - ${rem(16)}) calc(50% + 4px);

			&:focus {
				background-color: ${transparentize(0.8, colors.black0)};
			}
		`}
		value={value}
		onChange={e => onChange(Number(e.target.value))}
		{...props}>{
			options.map((label, i) =>
				<option value={i} key={i}>{label}</option>
			)
		}</select>
	</div>
}
export default FormSelect;