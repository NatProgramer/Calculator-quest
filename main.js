let buffer = '0';
let numbers = 0;
let prevNum = 0;
let operator;
// Obteniendo elementos del DOOM
const display = document.querySelector('.display-result');
const arrowBtn = document.querySelector('.arrow-button');
const deleteBtn = document.querySelector('.delete-button');
const numberBtns = document.querySelectorAll('.number-button');
const mathSymbols = document.querySelectorAll('.operators-colunm');
// Definiendo funciones

// Funcion para insertar numeros en el display
const insertNumbers = (value) => {
	// Insertando Numeros en el display
	if (buffer === '0') {
		buffer = value;
	} else {
		buffer += value;
	}
	display.innerHTML = buffer;
};

// Insertando simbolos en el display
const insertSymbols = (symbol) => {
	//Insertando simbolos en el display
	if (numbers != '=') {
		numbers += parseFloat(buffer);
	}
	switch (symbol) {
		case '+':
			operator = '+';
			prevNum = numbers;
			numbers += parseFloat(buffer);
			buffer = '0';
			break;
		case '-':
			operator = '-';
			prevNum = numbers;
			numbers -= parseFloat(buffer);
			buffer = '0';
			break;
		case 'x':
			operator = 'x';
			// 20 x 5 = 405
			// Numbers = 20
			// BufferFloat = 5
			//Numbers * bufferFloat = 20 * 20 + 5 = 405
			prevNum = numbers;
			numbers = numbers * parseFloat(buffer);
			buffer = '0';
			break;
		case '÷':
			operator = '÷';
			prevNum = numbers;
			numbers /= parseFloat(buffer);
			buffer = '0';
			break;
		case '=':
			if (operator == '+') {
				display.innerHTML = numbers - prevNum + '=';
				buffer = '0';
			} else if (operator == '-') {
				display.innerHTML = Math.abs(numbers - prevNum) + '=';
				buffer = '0';
			} else if (operator == 'x') {
				display.innerHTML = numbers + '=';
			} else {
				display.innerHTML = `ERROR: ${prevNum} ${operator} ${buffer}`;
			}
		default:
			break;
	}
};

// Funcion para eliminar todo lo escrito anteriormente
const deleteAll = () => {
	buffer = '0';
	numbers = 0;
	display.innerHTML = buffer;
};
// Eliminando el valor anterior
const deletePrevNumber = () => {
	if (buffer.length == 1) {
		buffer = '0';
		numbers = 0;
	} else {
		buffer = buffer.slice(0, buffer.length - 1);
	}
	display.innerHTML = buffer;
};

// Obteniendo los simbolos insertados por el usuario e insertandolos
mathSymbols.forEach((mathSymbol) =>
	mathSymbol.addEventListener('click', (e) => {
		let symbolInsertForTheUser = e.target.innerHTML;
		insertSymbols(symbolInsertForTheUser);
		console.log(symbolInsertForTheUser);
	})
);
// Obteniendo los numero insertados por el usuario e insertandolos
numberBtns.forEach((numberBtn) =>
	numberBtn.addEventListener('click', (e) => {
		let numberInsertForTheUser = e.target.innerText;
		insertNumbers(numberInsertForTheUser);
	})
);

// Agregando eventos para eliminar todos los valores insertados
deleteBtn.addEventListener('click', () => deleteAll());
arrowBtn.addEventListener('click', () => deletePrevNumber());
