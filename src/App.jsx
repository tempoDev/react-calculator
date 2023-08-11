import { useState } from "react";
import "./App.scss";

function App() {
  const [display, setDisplay] = useState("0");
  const [equals, setEquals] = useState(false);
  const [ lastOp, setLastOp] = useState("")

  const addNumber = () => {
    setCount(count + 1);
  };

  const handleNumber = (event) => {
    const number = event.target.textContent;

    if (equals) {
      setDisplay(number);
      setEquals(false);
    } else if (display == 0) {
      number == "0" ? setDisplay(0) : setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperation = (event) => {
    const operator = event.target.textContent;

    if (equals) {
      setDisplay(display + " " + operator + " ");
      setLastOp(operator);
      setEquals(false);
    } 
    
    else if (display === 0) {
      setDisplay(0);
    } 
    
    else if (lastIsDigit()) {
      setDisplay(display + " " + operator + " ");
      setLastOp(operator);
    } 
    
    else {
      
      if (operator != "-") {
        //Adivino dónde está el último dígito y sustituyo a partir de ahí
        const index = findLastDigitIndex(display);
        console.log("index: "+ index)
        if (index != -1) {
          const saved = display.slice(0, index);    
          setDisplay(saved + " " + operator + " ");
          setLastOp(operator);
        }
        
      } 
      
      else {
        if( lastOp != "+"){
          setDisplay(display + " " + operator + " ")
        } else {
          const saved = display.slice(0, display.length - 2);
          setDisplay(saved + " " + operator + " ");
          setLastOp(operator);
        }
      }
    }

  };

  const lastIsDigit = () => {
    return /^\d+$/.test(display.charAt(display.length - 1));
  };

  function findLastDigitIndex(str) {
    
    const reversedStr = str.split("").reverse().join("");
    const match = reversedStr.match(/\d/);
    
    if (match) {
      const lastDigitIndex = str.length - match.index;
      return lastDigitIndex;
    }
    
    return -1; // No se encontró ningún dígito en la cadena

  }
  

  const addDecimals = () => {

    if (display === 0) {
      setDisplay(display + ".");
    } else {
      let parts = display.split(" ");
      let last = parts[parts.length - 1];

      if (!last.includes(".") && /^\d+$/.test(last)) {
        setDisplay(display + ".");
      }
    }

  };

  const handleEquals = () => {
    
    try {

      display.includes("x")
      ? setDisplay(parseFloat(eval(display.replace("x", "*"))))
      : setDisplay(parseFloat(eval(display)));
      setEquals(true);

    } catch (error) {
      setDisplay('Error');
    }
    
  };

  const clearDisplay = () => {
    setDisplay(0);
  };

  return (
    <>
      <h1>Javascript Calculator</h1>
      <div className="container">
        <div className="display_container">
          <span className="display" id="display">
            {display}
          </span>
        </div>

        <div className="controls_container">
          <div className="button_width" onClick={clearDisplay} id="clear">
            <span>AC</span>
          </div>

          <div className="button" onClick={handleOperation} id="divide">
            /
          </div>

          <div className="button" onClick={handleOperation} id="multiply">
            x
          </div>

          <div className="button" onClick={handleNumber} id="seven">
            7
          </div>

          <div className="button" onClick={handleNumber} id="eight">
            8
          </div>

          <div className="button" onClick={handleNumber} id="nine">
            9
          </div>

          <div className="button" onClick={handleOperation} id="subtract">
            -
          </div>

          <div className="button" onClick={handleNumber} id="four">
            4
          </div>

          <div className="button" onClick={handleNumber} id="five">
            5
          </div>

          <div className="button" onClick={handleNumber} id="six">
            6
          </div>

          <div className="button" onClick={handleOperation} id="add">
            +
          </div>

          <div className="button" onClick={handleNumber} id="one">
            1
          </div>

          <div className="button" onClick={handleNumber} id="two">
            2
          </div>

          <div className="button" onClick={handleNumber} id="three">
            3
          </div>

          <div className="button" onClick={handleEquals} id="equals">
            =
          </div>

          <div className="button_width" onClick={handleNumber} id="zero">
            0
          </div>

          <div className="button" onClick={addDecimals} id="decimal">
            .
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
