import React, { useState } from "react";
import LaunchPad from "../LaunchPad"
import { useEffect } from "react";

import "./index.css";
import SplashScreen from "../SplashScreen";
import { Api, connect } from "../../api";
import { ApiContext, IdentityContext, IdentityValue } from "../../context";
import AccessPage from "../AccessPage";
import TokenPage from "../TokenPage";



const App = () => {
	let [api, setApi] = useState<Api|null>(null);
	let [identity, setIdentity] = useState<IdentityValue | null>(null);

	useEffect(() => {
		connect().then(async api => {
			let code = localStorage.getItem("identityCode");
			if (!code) {
				setIdentity({ code: null });
				setApi(api);
				return;
			}

			let type = await api.remoteFunction("VERIFY_IDENTITYCODE")({
				identityCode: code
			});

			if (type === "INVALID") {
				setIdentity({ code: null });
				setApi(api);
				return;
			}

			setIdentity({ code, type });
			setApi(api);
		});
	}, []);
	
	useEffect(() => {
		// @ts-ignore
		window.api = api;
	}, [api]);

	useEffect(() => {
		if (identity === null) return;

		if (identity.code) {
			localStorage.setItem("identityCode", identity.code);
		} else {
			localStorage.removeItem("identityCode");
		}
	}, [identity]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			document.body.style.setProperty("--window-inner-height", window.innerHeight + "px");
		})
		window.dispatchEvent(new Event("resize"));
	}, []);

	return api && identity ? <ApiContext.Provider value={api}>
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