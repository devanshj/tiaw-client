export const socketNextJson = (socket: WebSocket) => new Promise<unknown>(resolve => {
	socket.addEventListener("message", ({ data }) => {
		resolve(JSON.parse(data));
	}, { once: true })
})