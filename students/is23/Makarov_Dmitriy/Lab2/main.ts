type BinaryOp = "+" | "-" | "*" | "/";

const historyEl = document.getElementById("screenHistory") as HTMLElement;
const valueEl = document.getElementById("screenValue") as HTMLElement;

let current = "0";
let previous: string | null = null;
let op: BinaryOp | null = null;
let justEvaluated = false;

let accAdd = 0; // накапливаемое сложение
let accSub = 0; // накапливаемое вычитание

const DECIMAL_CHAR = ",";

// вспомогательные функции
function toNumber(s: string): number {
  const normalized = s.replace(" ", "").replace(DECIMAL_CHAR, ".");
  const n = Number(normalized);
  return isNaN(n) ? 0 : n;
}

function fromNumber(n: number): string {
  if (!Number.isFinite(n)) return "Ошибка";
  // немного сглаживаем плавающую точку
  const fixed = Number(n.toFixed(12));
  let s = fixed.toString();
  if (s.includes(".")) {
    s = s.replace(/\.?0+$/, "");
  }
  return s.replace(".", DECIMAL_CHAR);
}

function resetAll(): void {
  current = "0";
  previous = null;
  op = null;
  justEvaluated = false;
  updateScreen();
}

function updateScreen(): void {
  valueEl.textContent = current;
  if (previous !== null && op !== null) {
    const opSymbol =
      op === "+" ? "+" : op === "-" ? "−" : op === "*" ? "×" : "÷";
    historyEl.textContent = `${previous} ${opSymbol}`;
  } else {
    historyEl.textContent = "";
  }
}

function inputDigit(digit: string): void {
  if (justEvaluated) {
    current = "0";
    justEvaluated = false;
  }
  if (current === "0") {
    current = digit;
  } else {
    current += digit;
  }
  updateScreen();
}

function inputDecimal(): void {
  if (justEvaluated) {
    current = "0";
    justEvaluated = false;
  }
  if (!current.includes(DECIMAL_CHAR)) {
    current += DECIMAL_CHAR;
  }
  updateScreen();
}

function backspace(): void {
  if (justEvaluated) return;
  if (current.length <= 1) {
    current = "0";
  } else {
    current = current.slice(0, -1);
  }
  updateScreen();
}

function setOperator(symbol: string): void {
  const map: Record<string, BinaryOp> = {
    "+": "+",
    "−": "-",
    "×": "*",
    "÷": "/",
  };
  const nextOp = map[symbol];
  if (!nextOp) return;

  if (op !== null && previous !== null && !justEvaluated) {
    // считаем цепочкой
    const result = compute(previous, current, op);
    previous = result;
    current = "0";
  } else {
    previous = current;
    current = "0";
  }

  op = nextOp;
  justEvaluated = false;
  updateScreen();
}

function compute(aStr: string, bStr: string, operator: BinaryOp): string {
  const a = toNumber(aStr);
  const b = toNumber(bStr);
  let result: number;

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
      if (b === 0) return "Ошибка";
      result = a / b;
      break;
  }

  return fromNumber(result);
}

function equals(): void {
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
function changeSign(): void {
  if (current === "0") return;
  if (current.startsWith("-")) {
    current = current.slice(1);
  } else {
    current = "-" + current;
  }
  updateScreen();
}

// процент
function percent(): void {
  const n = toNumber(current);
  current = fromNumber(n / 100);
  updateScreen();
}

// √
function sqrt(): void {
  const n = toNumber(current);
  if (n < 0) {
    current = "Ошибка";
  } else {
    current = fromNumber(Math.sqrt(n));
  }
  justEvaluated = true;
  updateScreen();
}

// x²
function square(): void {
  const n = toNumber(current);
  current = fromNumber(n * n);
  justEvaluated = true;
  updateScreen();
}

// x³ (индивидуальная операция)
function cube(): void {
  const n = toNumber(current);
  current = fromNumber(n * n * n);
  justEvaluated = true;
  updateScreen();
}

// x! (факториал)
function factorial(): void {
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
function tripleZero(): void {
  if (current === "0") {
    current = "0";
  } else {
    current += "000";
  }
  updateScreen();
}

// накапливаемое сложение
function addToAccumulator(): void {
  accAdd += toNumber(current);
  historyEl.textContent = `Σ+ = ${fromNumber(accAdd)}`;
  justEvaluated = true;
}

// накапливаемое вычитание
function subFromAccumulator(): void {
  accSub -= toNumber(current);
  historyEl.textContent = `Σ− = ${fromNumber(accSub)}`;
  justEvaluated = true;
}

// смена фона по кнопке BG
function toggleBackground(): void {
  document.body.classList.toggle("theme-alt");
}

// смена цвета окна вывода WIN
function toggleScreenColor(): void {
  const screen = document.querySelector(".screen") as HTMLElement | null;
  if (!screen) return;
  screen.classList.toggle("screen-alt");
}

// ========== ОБРАБОТЧИКИ КНОПОК ==========

document.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  const btn = target.closest("button");
  if (!btn) return;

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

let a: (number | string)[] = [1,2,5,8,7, "padding"]
let b: number [] | string[] = []
let c: [string, number] = []