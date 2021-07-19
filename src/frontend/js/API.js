// Copyright (c) 2021 Ferib Hellscream
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

let ASAPI = function ()  {

	let serverURI = "https://animeshooter.com/api/";
	//let serverURI = "http://localhost:8088/";

	let playerCountElement;
	let playerPage;
	let roomCountElement;
	let roomPage;

	_init = function() {
		playerCountElement = document.getElementById("gs-playerscount");
		playerPage = document.getElementById("online-players");
		roomCountElement = document.getElementById("gs-roomcount");
		roomPage = document.getElementById("online-rooms");		
	}

	_getOnlinePlayers = function() {
		//fetch(serverURI + "player/online")
		//.then(response => response.json())
		//.then(data => console.log(data));
		
		var players = [{"name":"Ferib",experience:12,level:23,kills:69,deaths:1,meleeKills:0,gunKills:0,sniperKills:0,bombKills:0,gm:true}];
		playerCountElement.textContent = players.length;
		for(let i = 0; i < players.length; i++)
		{
			console.log("Name: " + players[i].name);
		}
	}

	_getActiveRooms = function() {
		
		fetch(serverURI + "room/")
		.then(response => response.json()
		.then(function (data) {
			rooms = data;
			roomCountElement.textContent = rooms.length;
			roomPage.innerText = ""; // clear
			var roomRow = document.createElement("div"); // parent
			roomRow.id = "gs-online";
			roomRow.className = "room-row";
			for(let i = 0; i < rooms.length; i++)
			{
				var roomCol2 = document.createElement("div");
				roomCol2.className = "room-col-2";
				var roomCol = document.createElement("div");
				roomCol.className = "room-col";
				var roomItem = document.createElement("div");
				roomItem.style = "background-image: url('/api/img/maps/small/" + rooms[i].map + ".png');";
				roomItem.className = "room-item";
				var roomTitle = document.createElement("span");
				roomTitle.className = "room-title";
				roomTitle.textContent = rooms[i].name;
				var roomDescription = document.createElement("div");
				roomDescription.className = "room-description";
				roomDescription.textContent = "Room Mode: " + rooms[i].mode;
				var roomFooter = document.createElement("span");
				roomFooter.className = "room-footer";
				roomFooter.textContent = rooms[i].playerCount + "/" + rooms[i].maxPlayers;			

				roomCol.appendChild(roomItem);
				roomCol.appendChild(roomTitle);
				roomCol.appendChild(roomDescription);
				roomCol.appendChild(roomFooter);
				roomCol2.appendChild(roomCol);
				roomRow.appendChild(roomCol2);
			}
			roomPage.appendChild(roomRow);
		}));
	}

	return {
		init: _init,
		getOnlinePlayers: _getOnlinePlayers,
		getActiveRooms: _getActiveRooms
	}
}