document.addEventListener('DOMContentLoaded', function() {
    // Initialization of calculator display and variables
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history');
    let lastOperationWasCalc = false;
    let history = [];

    resultDisplay.textContent = '';
    resultDisplay.classList.add('show');

    function addToHistory(text) {
        // Adds a calculation or action to the history
        history.push(text);
        if (history.length > 5) history.shift();
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        // Updates the display of the history section
        historyDisplay.innerHTML = history.join('<br>');
    }

    document.querySelector('.calculator-keys').addEventListener('click', function(e) {
        // Handles button clicks for performing calculations or actions
        if (!e.target.matches('button')) return;
        const key = e.target;
        const action = key.value;
        const currentDisplay = resultDisplay.textContent;
        const lastChar = currentDisplay[currentDisplay.length - 1];

        const isOperator = action => ['+', '-', '*', '/'].includes(action);
        const isLastCharOperatorOrDot = isOperator(lastChar) || lastChar === '.';

        if (action === 'DEL') {
            if (currentDisplay.length > 1) {
                resultDisplay.textContent = currentDisplay.slice(0, -1);
            } else {
                resultDisplay.textContent = '';
            }
        } else if (action === 'AC') {
            resultDisplay.textContent = '';
            addToHistory('Cleared');
        } else if (action === '=') {
            if (currentDisplay !== '') {
                try {
                    const result = eval(currentDisplay);
                    resultDisplay.textContent = result;
                    addToHistory(`${currentDisplay} = ${result}`);
                    lastOperationWasCalc = true;
                } catch {
                    resultDisplay.textContent = 'Error';
                    lastOperationWasCalc = true;
                }
            }
        } else {
            if (lastOperationWasCalc && !isNaN(action)) {
                resultDisplay.textContent = action;
            } else if ((action === '.' && lastChar === '.') || (isOperator(action) && isLastCharOperatorOrDot)) {
                return;
            } else {
                resultDisplay.textContent += action;
            }
            lastOperationWasCalc = false;
        }
    });

    document.addEventListener('keydown', function(e) {
        // Adds keyboard support for calculator operations
        const key = e.key;
        let buttonValue;
        if (key === 'Enter') { // Map Enter to "=" functionality
            buttonValue = '=';
        } else if (key === 'Backspace') { // Map Backspace to "DEL" functionality
            buttonValue = 'DEL';
        } else {
            buttonValue = key;
        }
    
        if (/[\d\+\-\*\/\.\=]|Enter|Backspace/.test(key)) {
            e.preventDefault(); // Prevent the default action for these keys
            // Use the modified buttonValue to find the corresponding button
            const button = document.querySelector(`button[value="${buttonValue}"]`);
            if (button) {
                button.click(); // Simulate a click on the button
            }
        }
    });
    

    document.getElementById('toggleHistory').addEventListener('click', toggleHistory);

    function toggleHistory() {
        // Toggles the display of the history section
        if (historyDisplay.style.display === 'none') {
            historyDisplay.style.display = 'block';
            document.getElementById('toggleHistory').textContent = 'Hide History';
        } else {
            historyDisplay.style.display = 'none';
            document.getElementById('toggleHistory').textContent = 'Show History';
        }
    }
});
