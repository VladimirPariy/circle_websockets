const socket = new WebSocket("ws://localhost:3000")
const circle: HTMLElement | null = document.querySelector('.circle');

type Coords = { left: number, top: number }


socket.addEventListener('open', () => {
	console.log("Connected to server");
});


if (circle) {
	
	circle.addEventListener('mousedown', (e) => {
		const coords = getCoords(circle)
		
		moveAt(e, coords)
		
		document.addEventListener('mousemove', (e) => {
			moveAt(e, coords);
		})
		
		circle.addEventListener('mouseup', () => {
			document.onmousemove = null;
			circle.onmouseup = null;
		})
	})
	
	circle.addEventListener('dragstart', () => {
		return false;
	})
	
	socket.onmessage = (event) => {
		const coords = JSON.parse(event.data)
		circle.style.left = coords.x
		circle.style.top = coords.y
		console.log(coords)
	}
}

const getCoords = (elem: Element): Coords => {
	const box = elem.getBoundingClientRect();
	return {
		top: box.top + scrollY,
		left: box.left + scrollX
	};
}

const moveAt = (e: MouseEvent, coords: Coords) => {
	const x = e.pageX - (e.pageX - coords.left) + 'px';
	const y = e.pageY - (e.pageY - coords.top) + 'px';
	socket.send(JSON.stringify({x, y}))
}