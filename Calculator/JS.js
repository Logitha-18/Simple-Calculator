const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let input = "";

// Button Click Handling
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (button.classList.contains("clear")) {
      input = "";
    }
    else if (button.classList.contains("backspace")) {
      input = input.slice(0, -1);
    }
    else if (button.classList.contains("equal")) {
      input = calculate(input);
    }
    else if (value) {
      input += value;
    }

    display.value = input;
  });
});

// Safe Calculation Function
function calculate(expression) {
  try {
    // Replace symbols for evaluation
    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

    const result = Function(`"use strict"; return (${expression})`)();
    return result.toString();
  } catch {
    return "Error";
  }
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    input += key;
  } else if (key === "Enter") {
    input = calculate(input);
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
  } else if (key === "Escape") {
    input = "";
  }

  display.value = input;
});