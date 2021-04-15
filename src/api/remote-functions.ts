import { onMessage } from "./utils";
import { Queuee, QueueForAccessor, Queue } from "./types";

type RemoteFunctions = {
	"INSERT_QUEUE": {
		parameters: {
			name: string,
			isQueueeStrengthable: boolean
		},
		returns: {
			accessCode: string
		}
	},
	"GET_QUEUE_WITH_PASSCODE": {
		parameters: {
			passCode: string
		},
		returns:
			| Queue
			| null
	},
	"GET_QUEUE_WITH_ACCESSCODE": {
		parameters: {
			accessCode: string
		},
		returns:
			| QueueForAccessor
			| null
	},
	"GET_QUEUE_WITH_TOKENCODE": {
		parameters: {
			tokenCode: string
		},
		returns:
			| Queue
			| null
	},
	"INSERT_QUEUEE_WITH_PASSCODE": {
		parameters: {
			name: string,
			strength: number | null,
			passCode: string,
			mobile: string
		},
		returns: {
			tokenCode: string
		}
	},
	"GET_QUEUEES_WITH_ACCESSCODE": {
		parameters: {
			accessCode: string
		},
		returns: Queuee[]
	},
	"VERIFY_IDENTITYCODE": {
		parameters: {
			identityCode: string
		},
		returns: "ACCESS" | "TOKEN" | "INVALID"
	},
	"DEQUEUE_WITH_ACCESSCODE": {
		parameters: {
			accessCode: string
		},
		returns: true
	}
}

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

	return new Promise(resolve => {
		let dispose = onMessage(socket, data => {
			if (data.type === "REMOTE_FUNCTION_RETURN" && data.identifier === identifier) {
				dispose();
				resolve(data.value);
			}
		});
	});
}

const remoteFunctionFor = (socket: WebSocket) =>
	<K extends keyof RemoteFunctions>(identifier: K) => 
		(parameters: RemoteFunctions[K]["parameters"]): Promise<RemoteFunctions[K]["returns"]> =>
			remoteFunction(socket, identifier, parameters);

export default remoteFunctionFor;
