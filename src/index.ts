import ws from 'ws';

const {Server: Index} = ws;
const wss = new Index({port: 3000})

let coords = ''

wss.on("connection", (ws) => {
	if(coords.length !== 0 ) ws.send(coords)
	ws.on("message", (rawMsg) => {
		wss.clients.forEach((client) => {
			coords = rawMsg.toString()
			client.send(rawMsg.toString())
		})
	})
})
