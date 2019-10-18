import { RemoteFunctions } from "./types";
import { socketNextJson } from "./utils";

const remoteFunction = async <K extends keyof RemoteFunctions>(
	socket: WebSocket,
	identifier: K,
	parameters: RemoteFunctions[K]["parameters"]
): Promise<RemoteFunctions[K]["returns"]> => {
	socket.send(JSON.stringify({
		type: "REMOTE_FUNCTION_CALL",
		identifier,
		parameters
	}));
	return await socketNextJson(socket) as any;
}

const remoteFunctionFor = (socket: WebSocket) =>
	<K extends keyof RemoteFunctions>(identifier: K) => 
		(parameters: RemoteFunctions[K]["parameters"]): Promise<RemoteFunctions[K]["returns"]> =>
			remoteFunction(socket, identifier, parameters);

export default remoteFunctionFor;
