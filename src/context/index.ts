import React from "react";
import { Api } from "../api";

export const ApiContext = React.createContext<Api>({} as any);

export type IdentityValue = 
	| { code: null }
	| { code: string, type: "ACCESS" | "TOKEN" }
export const IdentityContext = React.createContext<{
	value: IdentityValue,
	set: (v: IdentityValue) => void
}>({} as any);