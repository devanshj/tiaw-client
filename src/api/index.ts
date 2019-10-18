import remoteFunctionFor from "./remote-functions";

export const connect = async () => {
	let socket = new WebSocket("wss://tiaw.herokuapp.com/");
	await new Promise(r => socket.onopen = r);

	return {
		remoteFunction: remoteFunctionFor(socket)
	}
}
export type Api = typeof connect extends (...args: any[]) => Promise<infer T> ? T : never;