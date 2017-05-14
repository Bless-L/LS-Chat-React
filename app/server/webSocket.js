export function sendPrivateMsg(from, to, msg) {
	const targetSocket = allSocket[to]
	const sendSocket = allSocket[from]
	sendSocket.emit("selfMsg", msg)
	if(targetSocket) {
		targetSocket.emit("pmsg", msg, from)
	}
}