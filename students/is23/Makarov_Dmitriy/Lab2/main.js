const historyEl = document.getElementById("screenHistory");
const valueEl = document.getElementById("screenValue");
let current = "0";
let previous = null;
let op = null;
let justEvaluated = false;
let accAdd = 0; 
let accSub = 0; 
const DECIMAL_CHAR = ",";

// ========== ОСН. ОПЕРАЦИИ ==========

function toNumber(s) {
    const normalized = s.replace(" ", "").replace(DECIMAL_CHAR, ".");
    const n = Number(normalized);
    return isNaN(n) ? 0 : n;
}
function fromNumber(n) {
    if (!Number.isFinite(n))
        return "Ошибка";
    
    const fixed = Number(n.toFixed(12));
    let s = fixed.toString();
    if (s.includes(".")) {
        s = s.replace(/\.?0+$/, "");
    }
    return s.replace(".", DECIMAL_CHAR);
}
function resetAll() {
    current = "0";
    previous = null;
    op = null;
    justEvaluated = false;
    updateScreen();
}
function updateScreen() {
    valueEl.textContent = current;
    if (previous !== null && op !== null) {
        const opSymbol = op === "+" ? "+" : op === "-" ? "−" : op === "*" ? "×" : "÷";
        historyEl.textContent = `${previous} ${opSymbol}`;
    }
    else {
        historyEl.textContent = "";
    }
}
function inputDigit(digit) {
    if (justEvaluated) {
        current = "0";
        justEvaluated = false;
    }
    if (current === "0") {
        current = digit;
    }
    else {
        current += digit;
    }
    updateScreen();
}
function inputDecimal() {
    if (justEvaluated) {
        current = "0";
        justEvaluated = false;
    }
    if (!current.includes(DECIMAL_CHAR)) {
        current += DECIMAL_CHAR;
    }
    updateScreen();
}
function backspace() {
    if (justEvaluated)
        return;
    if (current.length <= 1) {
        current = "0";
    }
    else {
        current = current.slice(0, -1);
    }
    updateScreen();
}
function setOperator(symbol) {
    const map = {
        "+": "+",
        "−": "-",
        "×": "*",
        "÷": "/",
    };
    const nextOp = map[symbol];
    if (!nextOp)
        return;
    if (op !== null && previous !== null && !justEvaluated) {
        
        const result = compute(previous, current, op);
        previous = result;
        current = "0";
    }
    else {
        previous = current;
        current = "0";
    }
    op = nextOp;
    justEvaluated = false;
    updateScreen();
}
function compute(aStr, bStr, operator) {
    const a = toNumber(aStr);
    const b = toNumber(bStr);
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0)
                return "Ошибка";
            result = a / b;
            break;
    }
    return fromNumber(result);
}
function equals() {
    if (op !== null && previous !== null) {
        const result = compute(previous, current, op);
        current = result;
        previous = null;
        op = null;
        justEvaluated = true;
        updateScreen();
    }
}
// ========== ДОП. ОПЕРАЦИИ ==========

// +/- смена знака
function changeSign() {
    if (current === "0")
        return;
    if (current.startsWith("-")) {
        current = current.slice(1);
    }
    else {
        current = "-" + current;
    }
    updateScreen();
}
// процент
function percent() {
    const n = toNumber(current);
    current = fromNumber(n / 100);
    updateScreen();
}
// √
function sqrt() {
    const n = toNumber(current);
    if (n < 0) {
        current = "Ошибка";
    }
    else {
        current = fromNumber(Math.sqrt(n));
    }
    justEvaluated = true;
    updateScreen();
}
// x²
function square() {
    const n = toNumber(current);
    current = fromNumber(n * n);
    justEvaluated = true;
    updateScreen();
}
// x³ (индивидуальная операция)
function cube() {
    const n = toNumber(current);
    current = fromNumber(n * n * n);
    justEvaluated = true;
    updateScreen();
}
// x! (факториал)
function factorial() {
    const n = toNumber(current);
    if (!Number.isInteger(n) || n < 0 || n > 20) {
        current = "Ошибка";
        updateScreen();
        return;
    }
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    current = res.toString();
    justEvaluated = true;
    updateScreen();
}
// 000
function tripleZero() {
    if (current === "0") {
        current = "0";
    }
    else {
        current += "000";
    }
    updateScreen();
}
// накапливаемое сложение
function addToAccumulator() {
    accAdd += toNumber(current);
    historyEl.textContent = `Σ+ = ${fromNumber(accAdd)}`;
    justEvaluated = true;
}
// накапливаемое вычитание
function subFromAccumulator() {
    accSub -= toNumber(current);
    historyEl.textContent = `Σ− = ${fromNumber(accSub)}`;
    justEvaluated = true;
}
// смена фона по кнопке BG
function toggleBackground() {
    document.body.classList.toggle("theme-alt");
}
// смена цвета окна вывода WIN
function toggleScreenColor() {
    const screen = document.querySelector(".screen");
    if (!screen)
        return;
    screen.classList.toggle("screen-alt");
}

// ========== ОБРАБОТЧИКИ КНОПОК ==========
document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target)
        return;
    const btn = target.closest("button");
    if (!btn)
        return;
    const digit = btn.getAttribute("data-digit");
    const opSymbol = btn.getAttribute("data-op");
    const decimal = btn.getAttribute("data-decimal");
    const action = btn.getAttribute("data-action");
    if (digit !== null) {
        inputDigit(digit);
        return;
    }
    if (decimal !== null) {
        inputDecimal();
        return;
    }
    if (opSymbol !== null) {
        setOperator(opSymbol);
        return;
    }
    if (action !== null) {
        switch (action) {
            case "clear":
                resetAll();
                break;
            case "backspace":
                backspace();
                break;
            case "percent":
                percent();
                break;
            case "equals":
                equals();
                break;
            case "sign":
                changeSign();
                break;
            case "sqrt":
                sqrt();
                break;
            case "square":
                square();
                break;
            case "cube":
                cube();
                break;
            case "factorial":
                factorial();
                break;
            case "triple-zero":
                tripleZero();
                break;
            case "acc-add":
                addToAccumulator();
                break;
            case "acc-sub":
                subFromAccumulator();
                break;
            case "bg-toggle":
                toggleBackground();
                break;
            case "screen-toggle":
                toggleScreenColor();
                break;
        }
    }
});
// начальная отрисовка
resetAll();
