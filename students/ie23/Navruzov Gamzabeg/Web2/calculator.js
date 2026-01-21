// calculator.ts
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '0';
        this.operation = null;
        this.waitingForNewValue = false;
        this.isColdTheme = true;
        this.display = document.getElementById('result');
        this.attachEventListeners();
        this.updateDisplay();
    }
    attachEventListeners() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleButton(btn.id));
        });
        
        const themeButton = document.getElementById('theme_toggle');
        themeButton.addEventListener('click', () => this.toggleTheme());
    }
    handleButton(id) {
        if (id.startsWith('btn_')) {
            const key = id.slice(4);
            if ('0123456789'.includes(key))
                this.inputDigit(key);
            else if (key === 'dot')
                this.inputDecimal();
            else if (key === '000')
                this.input000();
            else if (key === 'clear')
                this.clear();
            else if (key === 'sign')
                this.toggleSign();
            else if (key === 'backspace')
                this.backspace();
            else if (key === 'plus' || key === 'minus' || key === 'mult' || key === 'div')
                this.handleOperation(this.getOp(key));
            else if (key === 'equal')
                this.calculate();
            else if (key === 'sqrt')
                this.sqrt();
            else if (key === 'square')
                this.square();
            else if (key === 'factorial')
                this.factorial();
            else if (key === 'reciprocal')
                this.reciprocal();
        }
    }
    getOp(key) {
        switch (key) {
            case 'plus': return '+';
            case 'minus': return '-';
            case 'mult': return '×';
            case 'div': return '/';
            default: return null;
        }
    }
    inputDigit(digit) {
        if (this.waitingForNewValue) {
            this.currentValue = digit;
            this.waitingForNewValue = false;
        }
        else {
            this.currentValue = this.currentValue === '0' ? digit : this.currentValue + digit;
        }
        this.updateDisplay();
    }
    inputDecimal() {
        if (this.waitingForNewValue) {
            this.currentValue = '0.';
            this.waitingForNewValue = false;
        }
        else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }
    input000() {
        if (this.waitingForNewValue || this.currentValue === '0') {
            this.currentValue = '0';
            this.waitingForNewValue = false;
        }
        else {
            this.currentValue += '000';
        }
        this.updateDisplay();
    }
    clear() {
        this.currentValue = '0';
        this.previousValue = '0';
        this.operation = null;
        this.waitingForNewValue = false;
        this.updateDisplay();
    }
    toggleSign() {
        if (this.currentValue !== '0') {
            this.currentValue = this.currentValue.startsWith('-') ? this.currentValue.slice(1) : '-' + this.currentValue;
        }
        this.updateDisplay();
    }
    backspace() {
        if (this.waitingForNewValue)
            return;
        if (this.currentValue.length <= 1 || this.currentValue === 'Error') {
            this.currentValue = '0';
        }
        else {
            this.currentValue = this.currentValue.slice(0, -1);
        }
        this.updateDisplay();
    }
    handleOperation(nextOp) {
        const current = parseFloat(this.currentValue);
        if (this.operation && !this.waitingForNewValue) {
            const result = this.performCalculation();
            this.currentValue = String(result);
            this.previousValue = this.currentValue;
            this.updateDisplay();
        }
        else {
            this.previousValue = this.currentValue;
        }
        this.operation = nextOp;
        this.waitingForNewValue = true;
    }
    performCalculation() {
        const prev = parseFloat(this.previousValue);
        const curr = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(curr))
            return 0;
        switch (this.operation) {
            case '+': return prev + curr;
            case '-': return prev - curr;
            case '×': return prev * curr;
            case '/': return curr !== 0 ? prev / curr : NaN;
            default: return curr;
        }
    }
    calculate() {
        if (this.operation && !this.waitingForNewValue) {
            const result = this.performCalculation();
            this.currentValue = isNaN(result) ? 'Error' : String(result);
            this.operation = null;
            this.waitingForNewValue = true;
        }
        this.updateDisplay();
    }
    sqrt() {
        const value = parseFloat(this.currentValue);
        this.currentValue = value < 0 ? 'Error' : String(Math.sqrt(value));
        this.updateDisplay();
    }
    square() {
        const value = parseFloat(this.currentValue);
        this.currentValue = String(value * value);
        this.updateDisplay();
    }
    factorial() {
        const n = Math.floor(parseFloat(this.currentValue));
        if (n < 0 || n > 20) {
            this.currentValue = 'Error';
        }
        else {
            let res = 1;
            for (let i = 2; i <= n; i++)
                res *= i;
            this.currentValue = String(res);
        }
        this.updateDisplay();
    }
    reciprocal() {
        const value = parseFloat(this.currentValue);
        this.currentValue = value === 0 ? 'Error' : String(1 / value);
        this.updateDisplay();
    }
    toggleTheme() {
        this.isColdTheme = !this.isColdTheme;
        const body = document.body;
        const container = document.querySelector('.container');
        const btn = document.getElementById('theme_toggle');
        if (this.isColdTheme) {
            body.style.background = 'linear-gradient(rgba(30,40,50,0.8), rgba(10,20,30,0.9)), url("https://russiatrek.org/blog/wp-content/uploads/2022/04/norilsk-russia-from-above-19.jpg") center/cover fixed';
            container.style.boxShadow = '0 0 30px rgba(135,206,250,0.4)';
            container.style.borderColor = '#4682b4';
            btn.textContent = '🔥 / ❄️ Смена темы';
        }
        else {
            body.style.background = 'linear-gradient(rgba(100,30,0,0.8), rgba(60,10,0,0.9)), url("https://i.imgur.com/5f3Z1jK.jpg") center/cover fixed';
            container.style.boxShadow = '0 0 40px rgba(255,100,50,0.7)';
            container.style.borderColor = '#ff4500';
            btn.textContent = '❄️ / 🔥 Смена темы';
        }
    }
    updateDisplay() {
        this.display.textContent = this.currentValue;
        const length = this.currentValue.length;
        let fontSize = '3.5rem';
        if (length > 9)
            fontSize = '3rem';
        if (length > 11)
            fontSize = '2.5rem';
        if (length > 13)
            fontSize = '2rem';
        if (length > 15)
            fontSize = '1.6rem';
        if (length > 18) {
            this.display.textContent = 'Error';
            fontSize = '2.5rem';
        }
        this.display.style.fontSize = fontSize;
    }
}
document.addEventListener('DOMContentLoaded', () => new Calculator());
