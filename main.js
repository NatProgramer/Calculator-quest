let buffer = '0';
let totalForMost = 0;
let previusOperator;

// Obteniendo elementos del DOOM
const display = document.querySelector('.display-result');
const calcsButtons = document.querySelectorAll('.calc-buttons');

function obtainedClickedValor(value) {
	if (isNaN(value)) {
		obtainedSymbol(value);
	} else {
		obtainedNumber(value);
	}
	display.innerHTML = buffer;
}
function obtainedSymbol(symbol) {
	switch (symbol) {
		case 'C':
			buffer = '0';
			totalForMost = 0;
			break;
		case '=':
			if (previusOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previusOperator = null;
			buffer = totalForMost;
			totalForMost = 0;
			break;
		case '←':
			if (buffer.length === 1) {
				buffer = '0';
			} else {
				buffer = buffer.slice(0, buffer.length - 1);
			}
			display.innerHTML = buffer;
			break;
		case '+':
		case '-':
		case 'x':
		case '÷':
			handleMath(symbol);
			break;
		default:
			break;
	}
}

function handleMath(symbol) {
	if (buffer === '0') {
		return;
	}
	const intBuffer = parseInt(buffer);
	if (totalForMost == 0) {
		totalForMost = intBuffer;
	} else {
		flushOperation(intBuffer);
	}

	previusOperator = symbol;
	buffer = '0';
}

function flushOperation(intBuffer) {
	if (previusOperator === '+') {
		totalForMost += intBuffer;
	} else if (previusOperator === '-') {
		totalForMost -= intBuffer;
	} else if (previusOperator === 'x') {
		totalForMost *= intBuffer;
	} else if (previusOperator === '÷') {
		totalForMost /= intBuffer;
	}
}

function obtainedNumber(numberStr) {
	if (buffer == '0') {
		buffer = numberStr;
	} else {
		buffer += numberStr;
	}
}

function main() {
	// Obteniendo los eventos de click de todos los botones
	calcsButtons.forEach((calcButton) =>
		calcButton.addEventListener('click', (e) => {
			obtainedClickedValor(e.target.innerText);
		})
	);
}

main();
