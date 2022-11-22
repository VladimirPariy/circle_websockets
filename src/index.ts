import ws from 'ws';

const {Server} = ws;
const wss = new Server({port:3000})

wss.on("connection", (ws) => {
		ws.on("message", (rawMsg) => {
			wss.clients.forEach((client) => {
				client.send(rawMsg.toString())
			})
	})
})
