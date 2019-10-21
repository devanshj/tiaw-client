import { onMessage } from "./utils";

type RemoteSubjects = {
	"QUEUE_CHANGE": {
		parameters: {
			accessCode: string
		},
		value: true
	},
	"QUEUEE_POSITION": {
		parameters: {
			tokenCode: string
		},
		value: number
	}
}

const remoteSubjectSubscribe = <K extends keyof RemoteSubjects>(
	socket: WebSocket,
	identifier: K,
	parameters: RemoteSubjects[K]["parameters"],
	listener: (value: RemoteSubjects[K]["value"]) => void
) => {
	socket.send(JSON.stringify({
		type: "REMOTE_SUBJECT_SUBSCRIBE",
		identifier,
		parameters
	}));
	onMessage(socket, data => {
		if (data.type === "REMOTE_SUBJECT_NEXT" && data.identifier === identifier) {
			listener(JSON.parse(data.value))
		}
	});
}

const remoteSubjectSubscribeFor = (socket: WebSocket) =>
	<K extends keyof RemoteSubjects>(identifier: K) => 
		(parameters: RemoteSubjects[K]["parameters"], listener: (value: RemoteSubjects[K]["value"]) => void) =>
			remoteSubjectSubscribe(socket, identifier, parameters, listener);

export default remoteSubjectSubscribeFor;
