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

	//let serverURI = "https://animeshooter.com/api/";
	let serverURI = "http://localhost:8088/";

	let playerCountElement;
	let playerPage;
	let roomCountElement;
	let roomPage;
	let accountErrorText;
	let accountLogin;
	let accountPanel;

	let player;
	let authToken;

	_init = function() {
		playerCountElement = document.getElementById("gs-playerscount");
		playerPage = document.getElementById("online-players");
		roomCountElement = document.getElementById("gs-roomcount");
		roomPage = document.getElementById("online-rooms");
		accountErrorText = document.getElementById("account-error");		
		accountLogin = document.getElementById("account-login");
		accountPanel = document.getElementById("account-panel");
	}

	_getOnlinePlayers = function() {
		fetch(serverURI + "player/online")
		.then(response => response.json()
		.then(function(data) {
			var players = data; //[{"name":"Ferib",experience:12,level:23,kills:69,deaths:1,meleeKills:0,gunKills:0,sniperKills:0,bombKills:0,gm:true}];
			playerCountElement.textContent = players.length;
			playerPage.innerText = ""; // clear
			var ul = document.createElement("ul");
			for(let i = 0; i < players.length; i++)
			{
				var li = document.createElement("li");
				var img = document.createElement("img");
				img.src = "/api/img/level/" + (players[i].gm ? "gm" : players[i].level);
				var span = document.createElement("span");
				span.textContent = players[i].name;

				li.appendChild(img);
				li.appendChild(span);
				ul.appendChild(li);
			}
			playerPage.appendChild(ul);
		}));	
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
				roomItem.style = "background-image: url('/api/img/maps/small/" + rooms[i].map + "');";
				roomItem.className = "room-item";
				var roomTitle = document.createElement("span");
				roomTitle.className = "room-title";
				roomTitle.textContent = "#" + rooms[i].id + " - " + rooms[i].name;
				var roomDescription = document.createElement("div");
				roomDescription.className = "room-description";
				roomDescription.textContent = rooms[i].mode; // TODO: add padlock for PW?
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

	_userLogin = function(name, pw) {
		fetch(serverURI + "user/login", {
			method: "POST",
			/* headers: {
				"Authorization": "0zx89H-jjBvFo-50JUds-mH8e3g"
			}, */
			body: JSON.stringify({"Username": name, "Password": pw})
		})
		.then(response => response.json()
		.then(function (data) {
			if(data.message != null)
			{
				accountErrorText.textContent = data.message;
				return;
			}	
			player = data.result;
			authToken = response.headers.get("x-auth-token");
			localStorage.setItem("af-token", authToken); // save local
			console.log("Logged in as " + data.result.name + ", with token " + authToken);
			
			// hide login/register panels
			accountErrorText.textContent = "";
			accountLogin.style.display = "none";
			accountPanel.style.display = "block";
			accountPanel.innerText = "Welcome, " + player.name + "!";
		}));
	}
	

	_userRegister = new function() {

	}

	_userUpdate = new function() {

	}

	return {
		init: _init,
		getOnlinePlayers: _getOnlinePlayers,
		getActiveRooms: _getActiveRooms,
		userLogin: _userLogin
	}
}