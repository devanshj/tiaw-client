export const onMessage = (socket: WebSocket, listener: (data: any) => void) => {
	const innerListener = ({ data }: WebSocketEventMap["message"]) => {
		listener(JSON.parse(data));
	}
	socket.addEventListener("message", innerListener);
	return () => socket.removeEventListener("message", innerListener);
}