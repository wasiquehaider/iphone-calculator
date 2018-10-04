import React, { Component } from 'react';
import './App.css';


class Calculator extends Component {
  
  state = {
    value : null,
    displayValue : '0',
    waitingForOperand : false,
    operator : null
  }
  
  clearDisplay(){
    this.setState({
      displayValue : '0',
      value : null
    })
  }

  inputDigit(digit){
    const {displayValue ,waitingForOperand} = this.state
    if(waitingForOperand){
      this.setState({
        displayValue : String(digit),
        waitingForOperand : false
      })
    } 
    else {
      this.setState({
      displayValue : displayValue === '0' ? String(digit) : displayValue + digit
    })}
  }

  inputDot(){
    const {displayValue, waitingForOperand} = this.state
    if(waitingForOperand){
      this.setState({
          displayValue : '.',
          waitingForOperand: false
        })
    }
    
    else if(displayValue.indexOf('.') === -1)
    this.setState({
      displayValue : displayValue + '.',
      waitingForOperand  : false
    })
  } 

  toggleSign(){
    const {displayValue} = this.state
    this.setState({
      displayValue : displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }
  
  inputPercent(){
    const {displayValue} = this.state
    const value = parseFloat(displayValue) 

    this.setState({
      displayValue : String(value / 100)
    })
  }

  performOperation(nextOperator){
    const {displayValue , operator ,value} = this.state

    const nextValue = parseFloat(displayValue)
    const operations = {
      '/' : (prevValue, nextValue) => prevValue / nextValue,
      '*' : (prevValue, nextValue) => prevValue * nextValue,
      '-' : (prevValue, nextValue) => prevValue - nextValue,
      '+' : (prevValue, nextValue) => prevValue + nextValue,
      '=' : (prevValue, nextValue) => nextValue,
    }
    if(value == null){
      this.setState({
        value: nextValue
      })
    }else if(operator){
        const currentValue = value || 0
        const computedValue = operations[operator](currentValue , nextValue)
        
        this.setState({
          value: computedValue,
          displayValue : String(computedValue)
        })
    }

    this.setState({
      waitingForOperand : true,
      operator : nextOperator
    })
  }

  render() {
    const {displayValue, value} = this.state
    return (

      <div className="calculator">
      {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/} {/*to check the JSON*/}
          <div className="calculator-display">
          <span className="previousValue">{value}</span>
          <span>{displayValue}</span>
          </div>
          <div class="calculator-keypad">
              <div className="input-keys">
                  <div className="function-keys">
                    <button className="calculator-key key-clear" onClick={() => this.clearDisplay()}>AC</button>
                    <button className="calculator-key key-sign" onClick={() => this.toggleSign()}>±</button>
                    <button className="calculator-key key-percent" onClick={() => this.inputPercent()}>%</button>
                  </div>
                  <div className="digit-keys">
                    <button className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</button>
                    <button className="calculator-key key-dot" onClick={() => this.inputDot(0)}>•</button>
                    <button className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</button>
                    <button className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</button>
                    <button className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</button>
                    <button className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</button>
                    <button className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</button>
                    <button className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</button>
                    <button className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</button>
                    <button className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</button>
                    <button className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</button>  
                  </div>
              </div>
                <div className="operator-keys">
                  <button className="calculator-key key-divide" onClick={() => this.performOperation('/')}>÷</button>  
                  <button className="calculator-key key-multiply" onClick={() => this.performOperation('*')}>x</button>  
                  <button className="calculator-key key-subtract" onClick={() => this.performOperation('-')}>-</button>  
                  <button className="calculator-key key-add" onClick={() => this.performOperation('+')}>+</button>  
                  <button className="calculator-key key-equals" onClick={() => this.performOperation('=')}>=</button>  
                </div>  
          </div>   
      </div>
    );
  }
}

export default Calculator;
