const socket = new WebSocket("ws://localhost:3000");
const circle: HTMLElement | null = document.querySelector('.circle');

type Coords = { left: number, top: number };


socket.addEventListener('open', () => {
	console.log("Connected to server");
});


if (circle) {
	
	socket.onmessage = (event) => {
		const coords = JSON.parse(event.data);
		circle.style.left = coords.x;
		circle.style.top = coords.y;
	}
	
	circle.onmousedown = (e) => {
		const coords = getCoords(circle);
		const cordX = e.pageX - coords.left;
		const cordY = e.pageY - coords.top;
		
		const moveAt = (e: MouseEvent) => {
			const x = e.pageX - cordX + 'px';
			const y = e.pageY - cordY + 'px';
			socket.send(JSON.stringify({x, y}));
		}
		moveAt(e);
		
		document.onmousemove = (e) => {
			moveAt(e);
		}
		
		circle.onmouseup = () => {
			document.onmousemove = null;
			circle.onmouseup = null;
		}
	}
	
	circle.ondragstart = () => {
		return false;
	}
	
	
}

const getCoords = (elem: Element): Coords => {
	const box = elem.getBoundingClientRect();
	return {
		top: box.top + scrollY,
		left: box.left + scrollX
	};
};

