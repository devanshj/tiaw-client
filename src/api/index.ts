import remoteFunctionFor from "./remote-functions";
import remoteSubjectSubscribeFor from "./remote-subject";

export const connect = async () => {
	let socket = new WebSocket(`wss://tiaw.herokuapp.com/`);
	await new Promise(r => socket.onopen = r);

	setInterval(() => socket.send("ping"), 1000);

	return {
		remoteFunction: remoteFunctionFor(socket),
		remoteSubjectSubscribe: remoteSubjectSubscribeFor(socket)
	}
}
export type Api = typeof connect extends (...args: any[]) => Promise<infer T> ? T : never;