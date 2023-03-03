const btns = document.querySelectorAll("button");
const display = document.getElementById("displayNum");
const calculator = document.getElementById("calculator");
function handle_calc(op,key)
{
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
}
let history=[]
function updateHistory()
{
const historyElement=document.getElementById("history")
while(historyElement.hasChildNodes())
historyElement.removeChild(historyElement.children[0])
  for(let i=0;i<history.length;i++)
  {
    let prevCalc=document.createElement("div");
    prevCalc.innerText=history[i];
    historyElement.appendChild(prevCalc);
  }
}
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const op = e.target.dataset.action;
    const key = btn.innerText;
    handle_calc(op,key);
  });
});
document.getElementsByTagName("body")[0].addEventListener('keydown', function (e) {
  // console.log(e.key)
  let op=undefined
  let key=""
  if(e.key=="+"||e.key=="-"||e.key=="*"||e.key=="/"||e.key=="="||e.key=="Enter"||
  e.key=="Backspace"||e.key=="Delete")
  key=e.key;
  else if((e.key>=0&&e.key<=9)||e.key==".")
  key=e.key;
  if(key=="="||key=="Enter")
  op="equals"
  else if(key=="+")
  op="add";
  else if(key=="-")
  op="minus";
  else if(key=="*")
  op="mul";
  else if(key=="/")
  op="div";
  else if(key=="Backspace")
  op="delete"
  else if(key=="Delete")
  op="clears"
  handle_calc(op,key);
}, false);

function calculate(f, o, s) {

  f = parseFloat(f);
  s = parseFloat(s);
  let res=0,op=null;
  switch (o) {
    case "add":
      res=f + s;
      op="+"
      break;
    case "minus":
      res=f - s;
      op="-"
      break;
    case "mul":
      res=f * s;
      op="*"
      break;
    case "div":
      res=f / s;
      op="/"
      break;
  }
  if(history.length==3)
  history.pop()
  if(history[0]!=`${f} ${op} ${s} = ${res}`)
  history.unshift(`${f} ${op} ${s} = ${res}`)
  updateHistory();
  return res;
}
