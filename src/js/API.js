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
	let accountErrorText;
	let accountToolErrorText;
	let accountPkaResult;
	let accountLogin;
	let accountPanel;
	let accountMsg;

	let player;
	let authToken;

	_init = function() {
		playerCountElement = document.getElementById("gs-playerscount");
		playerPage = document.getElementById("online-players");
		playerLeaderboard = document.getElementById("leaderboard-table");
		roomCountElement = document.getElementById("gs-roomcount");
		roomPage = document.getElementById("online-rooms");
		accountErrorText = document.getElementById("account-error");		
		accountToolErrorText = document.getElementById("account-tool-error");
		accountPkaResult = document.getElementById("account-pka-result");
		accountLogin = document.getElementById("account-login");
		accountPanel = document.getElementById("account-panel");
		accountMsg = document.getElementById("account-msg");
	}

	_getOnlinePlayers = function() {
		fetch(serverURI + "player/online")
		.then(response => response.json()
		.then(function(data) {
			var players = data.result; //[{"name":"Ferib",experience:12,level:23,kills:69,deaths:1,meleeKills:0,gunKills:0,sniperKills:0,bombKills:0,gm:true}];
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

	_getLeaderboard = function() {
		fetch(serverURI + "player/leaderboard")
		.then(response => response.json()
		.then(function(data) {
			var players = [ { "rank": 1, "name": "Ferib", "experience": 12, "level": 23, "kills": 69, "deaths": 1, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 2, "name": "Siyika", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 3, "name": "pietvdstreet", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 4, "name": "Siyka", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 5, "name": "VACEfron", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 6, "name": "jarno", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 7, "name": "test15", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 8, "name": "test14", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 9, "name": "test13", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 10, "name": "Test12", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 11, "name": "Test11", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 12, "name": "Test19", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 }, { "rank": 13, "name": "Anecera", "experience": 0, "level": 1, "kills": 0, "deaths": 0, "meleeKills": 0, "gunKills": 0, "launcherKills": 0, "bombKills": 0 } ];
			playerLeaderboard.innerText = ""; // clear
			for(let i = 0; i < players.length; i++)
			{
				let tr = document.createElement("tr");

				let td1 = document.createElement("td");
				td1.textContent = players[i].rank;
				tr.appendChild(td1);

				let td2 = document.createElement("td");		
				tr.appendChild(td2);

				let lvlImg = document.createElement("img");
				lvlImg.src = "/api/img/level/" +  (players[i].gm ? "gm" : players[i].level);
				td2.appendChild(lvlImg);

				let spanName = document.createElement("span");
				spanName.textContent = players[i].name;
				td2.appendChild(spanName);

				let td3 = document.createElement("td");
				td3.textContent = players[i].experience;
				tr.appendChild(td3);

				let td4 = document.createElement("td");
				td4.textContent = players[i].kills;
				tr.appendChild(td4);
			
				let td5 = document.createElement("td");
				td5.textContent = players[i].deaths;
				tr.appendChild(td5);

				playerLeaderboard.appendChild(tr);
			}
			
		}));	
	}

	_getActiveRooms = function() {	
		fetch(serverURI + "room/")
		.then(response => response.json()
		.then(function (data) {
			rooms = data.result;
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
			body: JSON.stringify({"Username": name, "Password": pw, "reToken": grecaptcha.getResponse()})
		})
		.then(response => response.json()
		.then(data => _handleLogin(data, response)));
	}

	_userRegister = function(name, email, pw) {
		fetch(serverURI + "user/register", {
			method: "POST",
			body: JSON.stringify({"Username": name, "Email": email, "Password": pw, "reToken": grecaptcha.getResponse() })
		}).then(response => response.json()
		.then(data => _handleLogin(data, response)));
	}

	_userAuth = function(token) {
		fetch(serverURI + "user/info", {
			headers: { "Authorization": token }
		})
		.then(response => response.json()
		.then(data => _handleLogin(data, response)));
	}

	_handleLogin = function (data, response) {
		grecaptcha.reset();
		if(data.message != null)
		{
			_handleLogout();
			accountErrorText.textContent = data.message;
			return;
		}	
		player = data.result;
		authToken = response.headers.get("x-auth-token");
		localStorage.setItem("as-token", authToken); // save local
	
		// hide login/register panels
		accountErrorText.textContent = "";
		accountLogin.style.display = "none";
		accountPanel.style.display = "block";
		accountMsg.innerText = "Welcome, " + player.name + "!";
	}

	_userLogout = function() {
		_handleLogout();
	}

	_handleLogout = function () {
		localStorage.setItem("as-token", null);
		authToken = null;
		// UI
		accountErrorText.textContent = "You have been logged out.";
		accountLogin.style.display = "block";
		accountPanel.style.display = "none";
		accountMsg.innerText = "";
	}

	_pkgUnpack = function(buffer) {
		fetch(serverURI + "pkg/unpack?base64=true", {
			method: "POST",
			headers: {"Authorization": authToken },
			body: buffer
		})
		.then(response => response.json()
		.then(function (data) {
			accountPkaResult.innerText = "";
			if(data.message != null)
			{
				accountToolErrorText.textContent = data.message;	
				return;
			}
			for(let i = 0; i < data.result.entries.length; i++)
			{
				var li = document.createElement("li");
				var a = document.createElement("a");
				a.textContent = data.result.entries[i];
				a.href = "data:multipart/form-data;base64," + data.result.contents[i];
				a.download = data.result.entries[i];
				//var input = document.createElement("input");
				//input.type = "hidden";
				//input.value = data.result.contents[i];
				//a.onclick = function() { console.log(atob(this.children[0].value)); }
				//a.appendChild(input)
				li.appendChild(a);
				accountPkaResult.appendChild(li);
			}
		}));
	}

	_pkgPack = function () {
		
	}

	return {
		init: _init,
		getOnlinePlayers: _getOnlinePlayers,
		getLeaderboard: _getLeaderboard,
		getActiveRooms: _getActiveRooms,
		userLogin: _userLogin,
		userAuth: _userAuth,
		userRegister: _userRegister,
		userLogout: _userLogout,
		pkgUnpack: _pkgUnpack,
		pkgPack: _pkgPack
	}
}