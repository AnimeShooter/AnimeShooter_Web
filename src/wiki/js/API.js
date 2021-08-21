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

let WIKIAPI = function ()  {

	//let serverURI = "https://animeshooter.com/api/";
	let serverURI = "http://localhost:8088/";

	skillsList = document.getElementById("skills-list");

	_init = function() {

	}

	_loadSkills = function() {
		fetch(serverURI + "wiki/cards/skills/")
		.then(response => response.json()
		.then(function(data) {
			var skills = data.result;
			var ul = document.createElement("ul");
			for(let i = 0; i < skills.length; i++)
			{
				var li = document.createElement("li");
				var div = document.createElement("div");
				div.className = "skill-item";
				var img = document.createElement("img");
				img.src = serverURI + "img/cards/skill/" + skills[i].texture;
				img.alt = skills[i].name + " skillcard";
				img.width = 110;
				img.height = 72;
				var span = document.createElement("h3");
				span.textContent = skills[i].name;
				var p = document.createElement("p");
				p.innerText = skills[i].description;

				div.appendChild(img);
				div.appendChild(span);
				div.appendChild(p)
				li.appendChild(div);
				ul.appendChild(li);
			}
			skillsList.appendChild(ul);
		}));	
	}

	return {
		init: _init,
		loadSkills: _loadSkills
	}
}