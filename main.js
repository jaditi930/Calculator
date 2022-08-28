const btns = document.querySelectorAll("button");
const display = document.getElementById("display");
const calculator = document.getElementById("calculator");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const op = e.target.dataset.action;
    const key = btn.innerText;
    if (op == "clears") {
      display.innerText = "";
      calculator.dataset.firstValue=""
      calculator.dataset.secondValue=""
      calculator.dataset.operator=""
      calculator.dataset.previousOp=""

    } 
    else if(op=="delete")
    {
        if(calculator.dataset.previousOp=="operator")
        calculator.dataset.previousOp=""
        else
        {
        display.innerText=display.innerText.slice(0,-1);
        }
    }
    else if (op == "equals") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = display.innerText;
      display.innerText = calculate(firstValue, operator, secondValue);
      calculator.dataset.firstValue = display.innerText;
    } else if (op == undefined || (op == "dec" && !(display.innerText.includes('.')))) {
      if (calculator.dataset.previousOp == "operator") {
        display.innerText = key;
      } else if (display.innerText == 0) display.innerText = key;
      else display.innerText += key;
      calculator.dataset.previousOp = "operand";
    } else if (calculator.dataset.previousOp == "operand") {
      calculator.dataset.previousOp = "operator";
      calculator.dataset.firstValue = display.innerText;
      display.innerText = key;
      calculator.dataset.operator = op;
    }
    calculator.dataset.prevKey=key;
  });
});
function calculate(f, o, s) {
  f = parseFloat(f);
  s = parseFloat(s);
  console.log(f,o,s)
  let res=0;
  switch (o) {
    case "add":
      res=f + s;
      break;
    case "minus":
      res=f - s;
      break;
    case "mul":
      res=f * s;
      break;
    case "div":
      res=f / s;
      break;
  }
  return res;
}
