function updateOnlineStatus(online)
{
	var dots = document.getElementsByClassName("wsstatus")
	for(var i = 0; i < dots.length; i++)
	{
		if(online)
			dots[i].classList.replace("dot-red","dot-green");
		else
			dots[i].classList.replace("dot-green","dot-red");
	}
}


/* Websocket (TODO: move to wsserver.js) */
let wsserver = function (URI) {

	var ServerURI = URI;
	var wSocket;
	var lastConnect = 0;

	//let pageConsole = document.getElementByClass("page-console")[0]; // TODO pass as arg

	// Client OpCodes
	let CMSG_AUTH = 0
	let CMSG_HANDSHAKE = 1
	let CMSG_KEYEXCHANGE = 2
	let CMSG_LOGIN = 3
	let CMSG_REGISTER = 4
	let CMSG_STATS = 5
	let CMSG_PING = 6
	
	// Server Opcodes
	let SMSG_PONG = 0
	let SMSG_STATS_RSP = 5
	
	var index;
	var buffer;
	var startTime = 0;	
	
	// Callback handlers
	var _connectCallback;
	var _loginCallback;
	var _statsCallback;
	var _disconnectCallback;
	
	
	_start = function() {
		// auto connect/ping on interval
		_connect();
		setInterval(function() {
			if(wSocket)
			{
				if(_isConnected() && lastConnect + 15000 < _getTicks())
				{
					lastConnect = _getTicks();
					_ping();
					
				}
			}
			else if(lastConnect + 10000 <  _getTicks())
			{
				lastConnect = _getTicks()
				_connect();
			}
		}, 5000)
	}
	
	_connect = function() {
		console.log("Trying to connect...");
		wSocket = new WebSocket(ServerURI);
		wSocket.binaryType = "arraybuffer";
		wSocket.onopen = _connectRsp;
		wSocket.onmessage = _onData;
		wSocket.onclose = _disconnect;
		wSocket.onerror = _disconnect;
	}
	
	_connectRsp = function() {
		// TODO: set user connectd & store login
		_connectCallback();
	}
	
	_disconnect = function(){
		wSocket = null;
		_disconnectCallback();
	}
	
	_onData = function(e) {
		var enc = new TextEncoder(); // TODO: fix text serverside
		var buffer = enc.encode(e.data)
		var opcode = buffer[1];
		switch (opcode) 
		{
			case SMSG_PONG: 
				_pong(buffer); 
				break;
			case SMSG_STATS_RSP:
				_statsRsp(e.data);
				break;
			default:
				console.log("UnkOpcode '" + opcode + "'");
		}
	}

	_login = function(user, pw) {
		let index = 1;
		var len = user.length + pw.length + 3;
		buffer = new Uint8Array(new ArrayBuffer(len));
		buffer[0] = CMSG_LOGIN
		index += _writeString(buffer, index, user)
		index += _writeString(buffer, index, pw)
		wSocket.send(buffer)
		console.log("done");
	}
	
	_loginRsp = function(buffer) {
		// TODO
		_loginCallbback("test")
	}
	
	_stats = function(index) {
		// TODO
	}
	
	_statsRsp = function(buffer) {
		_statsCallback(buffer)
	}
	
	_stats = function(index) {
		// TODO
	}
	
	_ping = function(index) {
		console.log("ping");
		buffer = new Uint8Array(new ArrayBuffer(1));
		buffer[0] = CMSG_PING
		wSocket.send(buffer);
	}
	
	_pong = function(buffer) {
		// TODO
		console.log("pong")
	}
	
	_isConnected = function() {
		return wSocket && wSocket.readyState == WebSocket.OPEN; 
	}
	
	// Private
	_writeString = function(ab, offset, str)  {
		var bytes = new Uint8Array(ab, offset)
		for (var i = 0; i < str.length; i++)
			bytes[i] = str.charCodeAt(i);
		bytes[str.length] = 0
		return str.length + 1
	}
	
	_getTicks = function() {
		return ((new Date()).getTime()) - startTime;
	}
	
	return {
		start: _start,
		login: _login,
		loginRsp: _loginRsp,
		
		onLogin: _loginCallback,
		onConnect: function(f){ _connectCallback = f },
		onLogin: function(f){ _loginCallback = f },
		onStats: function(f){ _statsCallback = f },
		onDisconnect: function(f){ _disconnectCallback = f },
		connected: _isConnected
	}
};

//let wss = new wsserver("ws://localhost:8026");
let wss = new wsserver("wss://animeshooter.com/ws");
wss.onConnect(function() {
	console.log("Connected!")
	updateOnlineStatus(wss.connected())
});
wss.onDisconnect(function() {
	console.log("Disconnected!")
	updateOnlineStatus(wss.connected())
});
wss.onStats(function(rawStats) {
	console.log("Stats obtained!")
	var list = document.getElementById("d2rga-online");
	var counter = document.getElementById("d2rga-playerscount");
	var players = rawStats.split(';')
	list.innerHTML = "";
	counter.innerText = players.length-1;
	for(var i = 1; i < players.length; i++)
	{
		var litem = document.createElement('div');
		litem.classList += "online-col";
		var pinfo = players[i].split(':')
		var data = "[" + pinfo[3] + "]: Lvl " + pinfo[1] + " " + pinfo[2];
		var limg = document.createElement('div');
		limg.classList += "online-pic";
		litem.appendChild(limg);
		lspan = document.createElement('span');
		lspan.classList += "online-text";
		lspan.appendChild(document.createTextNode(data))
		litem.appendChild(limg)
		litem.appendChild(lspan)
		list.appendChild(litem)
	}
});
wss.start();