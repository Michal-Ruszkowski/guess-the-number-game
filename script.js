const container = document.getElementById("container");
const yes = new Audio(src = "audio/yes.wav"); //from https://freesound.org/people/gnuoctathorpe/sounds/404868/
const winner = new Audio(src = "audio/winner.mp3"); //from https://freesound.org/people/FunWithSound/sounds/456966/


document.getElementById("game").addEventListener("click", function () {
	container.style.backgroundColor = "#000";
	container.style.display = "block";
	const el = '<div id="titleGame">Zgadnij liczbę całkowitą od 1 do 1000</div>';
	const el1 = '<div id="hi-score"></div>';
	const el2 = '<div id="inputNumber"></div>';
	const el3 = '<div id="result"></div>';
	const el4 = '<div id="howManyTries"></div>';
	const el5 = '<div id="retry-or-back"></div>';
	container.innerHTML = el + el1 + el2 + el3 + el4 + el5;
	guessNumber();
});

let restartGuess = false;

function guessNumber() {

	if (restartGuess == false) {
		const inputNumber = document.getElementById("inputNumber");
		inputNumber.innerHTML = `<input id="betNumber" type="number"/><input class="submit" type="submit" value="Sprawdź" onclick="chechTheNumber()"/>`;
	} else {
		tries = 0;
		const el = '<div id="titleGame">Zgadnij liczbę całkowitą od 1 do 1000</div>';
		const el1 = `<div id="hi-score">rekord: ${hiScore}</div>`;
		const el2 = '<div id="inputNumber"></div>';
		const el3 = '<div id="result"></div>';
		const el4 = '<div id="howManyTries"></div>';
		const el5 = '<div id="retry-or-back"></div>';
		container.innerHTML = el + el1 + el2 + el3 + el4 + el5;
		secretNumber = Math.floor(Math.random() * 1000 + 1);
		inputNumber.innerHTML = `<input id="betNumber" type="number"/><input type="submit" class="submit" value="Sprawdź" onclick="chechTheNumber()"/>`;
	}
}

let secretNumber = Math.floor(Math.random() * 1000 + 1);
let tries = 0;
let hiScore = 1000;

function chechTheNumber() {
	yes.play();
	tries++;
	let betNumber = parseFloat(document.getElementById("betNumber").value);
	const result = document.getElementById("result");

	if (isNaN(betNumber)) {
		result.innerHTML = "Nie podano poprawnej liczby";
	} else if (Number.isInteger(betNumber) == false) {
		result.innerHTML = "Nie podano liczby całkowitej";
	} else if (betNumber > 1000 || betNumber < 1) {
		result.innerHTML = "Podano liczbę spoza przedziału 1-1000";
	} else if (betNumber < secretNumber) {
		result.innerHTML = "Moja liczba jest większa";
	} else if (betNumber > secretNumber) {
		result.innerHTML = "Moja liczba jest mniejsza";
	} else if (betNumber === secretNumber) {
		restartGuess = true;
		result.innerHTML = "Gratulacje, zgadłeś liczbę!";
		inputNumber.innerHTML = "";
		document.getElementById("howManyTries").innerHTML = `Twój wynik to ${tries} prób`;
		document.getElementById("retry-or-back").innerHTML = `<div><span class="reload" onclick="guessNumber()">spróbuj jeszcze raz</span></div><div><span class="reload" onclick="location.reload()">powrót</span></div>`;
		if (tries < hiScore) {
			winner.play();
			hiScore = tries;
			document.getElementById("hi-score").innerHTML = `rekord: ${hiScore}`;
			titleGame.innerHTML = `NOWY REKORD!`;
		}
	}
	document.getElementById("betNumber").value="";
}
