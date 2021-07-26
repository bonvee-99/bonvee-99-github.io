let usedPositions = [];

let currentPosts = [];

let unusedPosts = [];

const LIMIT = 15;

const BOXSIZE = 10;
const SPACING = 5;

const TIME = 5000;

function post() {
	document.getElementById('post-text').style.display = "block";
	document.body.style.overflow = "hidden";
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
 	
}

function hidePopUp() {
	document.getElementById('post-text').style.display = "none";
	document.getElementById("text").value = "";
	document.body.style.overflow = "visible";
}

function contact() {
	document.getElementById('contact-popup').style.display = "block";
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Oper
}

function hideContactCard() {
	document.getElementById('contact-popup').style.display = "none";
}

function addPostBox() {
	let inputText = document.getElementById("text").value;
	if (!(inputText == "" || inputText == null)) {
		let box = document.createElement("div");
		box.classList.add("post-box-container");

			
		let deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-button");
		deleteButton.addEventListener("click", removePost);
		let deleteText = document.createTextNode("x");
		deleteButton.appendChild(deleteText);

		let text = document.createTextNode(inputText);

		box.appendChild(deleteButton);
		box.appendChild(text);

		if (currentPosts.length < LIMIT) {
			let position = getCoordinates();
			
			box.style.left = position.x + '%';
			box.style.top = position.y + '%';
			document.getElementById("post").appendChild(box);
			currentPosts.push(box);
		} else {
			unusedPosts.push(box);
		}
	}
}


function getCoordinates() {
	let xPos = Math.round(Math.random() * (79 - 1) + 1);
	let yPos = Math.round(Math.random() * (84 - 1) + 1);
	var position = {x: xPos, y: yPos};
	if (!isOverlapping(position)) {
		usedPositions.push(position);
		return position;
	} else {
		return getCoordinates();
		// add something here to rotate or change images in a cycle once the screen is filled (ontick()?)... or just create a new page...?
	}
}

function isOverlapping(position) {
	// loops through used positions to see if new position overlaps with any of them
	const box1 = {
		xInterval : {min: position.x, max: position.x + BOXSIZE + SPACING},
		yInterval : {min: position.y, max: position.y + BOXSIZE + SPACING}
	}
	for (position2 of usedPositions) {
		if (checkInterval(box1.xInterval, {min: position2.x, max: position2.x + BOXSIZE + SPACING}) && checkInterval(box1.yInterval, {min: position2.y, max: position2.y + BOXSIZE + SPACING})) {
			return true;
		}
	}
	return false;
}

function checkInterval(int1, int2) {
	let condition = (int1.max >= int2.min) && (int2.max >= int1.min);
	return condition;
}

function switchPosts() {
	if (currentPosts.length >= LIMIT && unusedPosts.length > 0) {
		let removed = currentPosts.shift();
		usedPositions.shift(); // removes boxes position from used positions
		document.getElementById("post").removeChild(removed); // removes first element in arrau/oldest one
		unusedPosts.unshift(removed);

		let addedPost = unusedPosts.pop();

		let position = getCoordinates();
		addedPost.style.left = position.x + '%';
		addedPost.style.top = position.y + '%';

		setTimeout(() => {
			document.getElementById("post").appendChild(addedPost)}, TIME / 2);
			currentPosts.push(addedPost);
		}
	if (currentPosts.length < LIMIT && unusedPosts.length > 0) {
			let addedPost = unusedPosts.pop();

			let position = getCoordinates();
			addedPost.style.left = position.x + '%';
			addedPost.style.top = position.y + '%';

			document.getElementById("post").appendChild(addedPost);
			currentPosts.push(addedPost);
	}
}

function removePost() {
	let xPos = this.parentElement.style.left;
	let yPos = this.parentElement.style.top;
	xPos = xPos.replace("%", "");
	yPos = yPos.replace("%", "");
	xPos = parseInt(xPos, 10);
	yPos = parseInt(yPos, 10);
	
	const indexPos = findIndexOfPosition({x: xPos, y: yPos});
	if (indexPos > - 1) {
		usedPositions.splice(indexPos, 1);
	}
	
	document.getElementById("post").removeChild(this.parentElement);	
	const index = currentPosts.indexOf(this.parentElement);
	if (index > -1) {
		currentPosts.splice(index, 1);
	}
}



function findIndexOfPosition(position) {
	let jsonPos = JSON.stringify(position);

	for (pos of usedPositions) {
		if (JSON.stringify(pos) == jsonPos) {
			return usedPositions.indexOf(pos);
		}
	}
	return -1;
}

setInterval(switchPosts, TIME);


window.addEventListener("scroll", checkScroll);

function checkScroll() {
	if (window.scrollY >= window.innerHeight * 2) {
		document.getElementById("nav").style.backgroundColor = "#3aafa9"
	} else {
		document.getElementById("nav").style.backgroundColor = "";
	}
}

let hidden = false;

function toggleNavBar() {

	if (hidden == false) {

		document.getElementById("nav-list").classList.remove("show-nav");

		document.getElementById("nav-list").classList.add("hide-nav");

		hidden = true;

	} else {
		document.getElementById("nav-list").classList.remove("hide-nav");

		document.getElementById("nav-list").classList.add("show-nav");

		hidden = false;
	}

	
}
