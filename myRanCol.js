let string = "Kalvin's Simplifier";
let array = string.split('');
//var len = array.length;
const randomColor = () => {
    const heading = document.createElement('h1');
    array.forEach((element) => {
	const span = document.createElement("span");
	span.setAttribute("class", "spanify");
	span.textContent = element;
	var randomColour = Math.floor(Math.random()*(256**3)).toString(16);
	span.style.color = "#" + randomColour;
	span.style.fontSize = "200%";
	heading.appendChild(span);
    });
    document.getElementById("page").appendChild(heading);
};
window.onload = randomColor();
