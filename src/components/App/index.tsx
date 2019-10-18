import React, { useState } from "react";
import LaunchPad from "../LaunchPad"
import { useEffect } from "react";

import "./index.css";
import SplashScreen from "../SplashScreen";
import { Api, connect } from "../../api";
import { ApiContext, IdentityContext, IdentityValue } from "../../context";
import AccessPage from "../AccessPage";
import TokenPage from "../TokenPage";

let accessMatch = document.cookie.match(/(?:^|;)\saccessCode=([^; ]*)/);
let tokenMatch = document.cookie.match(/(?:^|;)\stokenCode=([^; ]*)/);
let initialIdentity: IdentityValue = 
	accessMatch ? { code: accessMatch[1], type: "ACCESS" } :
	tokenMatch ? { code: tokenMatch[1], type: "TOKEN" } :
	{ code: null };

const App = () => {
	let [api, setApi] = useState<Api|null>(null);
	let [identity, setIdentity] = useState<IdentityValue>(initialIdentity);

	useEffect(() => {
		connect().then(setApi);
	}, []);

	useEffect(() => {
		// @ts-ignore
		window.api = api;
	}, [api]);

	useEffect(() => {
		document.cookie = identity.code
			? identity.type.toLowerCase() + "Code=" + identity.code + "; "
			: "";
	}, [identity]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			document.body.style.setProperty("--window-inner-height", window.innerHeight + "px");
		})
		window.dispatchEvent(new Event("resize"));
	}, []);

	return api ? <ApiContext.Provider value={api}>
		<IdentityContext.Provider value={{
			value: identity,
			set: setIdentity
		}}>{
			identity.code === null ? <LaunchPad/> :
			identity.type === "ACCESS" ? <AccessPage/> :
			identity.type === "TOKEN" ? <TokenPage/> :
			null
		}</IdentityContext.Provider>
	</ApiContext.Provider> : <SplashScreen/>;
}
export default App;