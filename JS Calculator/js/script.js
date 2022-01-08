class CalculatorState
{
    static waitingForFirstNum = new CalculatorState("waitingForFirstNumber");
    static gettingFirstNum = new CalculatorState("gettingFirstNumber");
    static waitingForSecondNum = new CalculatorState("waitingForSecondNumber");
    static secondNumReady = new CalculatorState("secondNumberReady");

    constructor(name)
    {
        this.name = name;
    }
}


var calculatorState;
var firstNum = 0;
var secondNum = 0;
var result = 0;
var decimalEntered = false;
var tempValue = '';
var currentOperator = '';

setUp(); // .................Calling Setup Function here

function setUp()
{
    var textbox = document.getElementById('userinput');
    textbox.value = '0';
    tempValue = '0';
    currentOperator = '';
    firstNum = 0
    secondNum = 0;
    result = 0;
    decimalEntered = false;
    calculatorState = CalculatorState.waitingForFirstNum;
}

function getInput()
{
    var input = tempValue;
    //console.log(typeof(input));
    //console.log(input);

    var decimalNum = false;
    decimalNum = isDecimal(input);
    console.log('decimal ' + decimalNum);

    var finalInput;
    if(decimalNum)
        finalInput = parseFloat(input);
    else
        finalInput = parseInt(input);

    console.log(typeof(finalInput));
    console.log('processedInput : ' + finalInput);

    return finalInput;
}

function isDecimal(input)
{
    for(var x = 0; x < input.length; x++)
    {
        //console.log(input[x]);
        if(input[x] == '.')
            return true;
    }

    return false;
}

function checkleadingZero()
{
    if(tempValue[0] == '0')
    {
        return true;
    }

    return false;
}

function checkZeroIsFirst(textbox)
{
    if(textbox[0] == '0')
        return true;
    return false;
}

function replaceString(val, index, replacement) 
{
    return val.substr(0, index) + replacement + val.substr(index + replacement.length);
}

function checkZeroAfterOperator(textbox, input)
{
    var v = textbox;
    for(var i = 0; i < textbox.length; i++)
    {
        if(textbox[i] == '+' || textbox[i] == '-' || textbox[i] == '*' || textbox[i] == '/')
        {
            console.log('true');
            if(textbox[i + 2] == '0')
            {
                console.log(v[i + 2]);
                v = replaceString(textbox, i + 2, input);
                return v;
            }
        }

        console.log(textbox[i]);
    }

    return v;
}

function registerNumber(input)
{
    var textbox = document.getElementById('userinput');
    console.log('registerNumber');
    if(calculatorState == CalculatorState.waitingForFirstNum)
    {
        calculatorState = CalculatorState.gettingFirstNum;
        if(checkleadingZero() && !decimalEntered)
        {
            tempValue = input;
            textbox.value = input;
        }
        else
        {
            tempValue += input;
            textbox.value += input;
        }
        console.log(calculatorState.name);
    }
    else if(calculatorState == CalculatorState.gettingFirstNum)
    {
        if(checkleadingZero()  && !decimalEntered)
        {
            tempValue = input;
            textbox.value = input;
        }
        else
        {
            tempValue += input;
            textbox.value += input;
        }

    }
    else if(calculatorState == CalculatorState.waitingForSecondNum)
    {
        //tempValue = '';
        console.log('tempValue ' + tempValue);
        calculatorState = CalculatorState.secondNumReady;
        tempValue += input;
        textbox.value += input;
        console.log(calculatorState.name);
    }
    else if(calculatorState == CalculatorState.secondNumReady)
    {
        if(checkleadingZero() && !decimalEntered)
        {
            tempValue = input;
            var txtVal = checkZeroAfterOperator(textbox.value, input);

            textbox.value = txtVal;
        }
        else
        {
            tempValue += input;
            textbox.value += input;
        }
    }



    console.log('tempValue ' + tempValue);
}

function registerZero()
{
    var leadingZero = checkleadingZero();
    console.log('leadingZero : ' + leadingZero);
    if(decimalEntered || !leadingZero)
    {
        var zeroInput = '0';
        if(calculate == CalculatorState.waitingForFirstNum)
        {
            calculatorState = CalculatorState.gettingFirstNum;
        }
        else if(calculatorState == CalculatorState.waitingForSecondNum)
        {
            calculatorState = CalculatorState.secondNumReady;
        }

        var textbox = document.getElementById('userinput');
        tempValue += zeroInput;
        textbox.value += zeroInput;

        console.log('tempValue ' + tempValue);
        console.log(calculatorState.name);
    }
}

function registerDecimal()
{
    var textbox = document.getElementById('userinput');

    if(decimalEntered)
    {
        alert('Error! More than one decimal is not allowed, this makes no sense');
        return;
    }

    tempValue += '.';
    console.log('tempValue ' + tempValue);
    textbox.value += '.';
    decimalEntered = true;
    console.log('decimalEntered : ' + decimalEntered);
}

function storeFirstNum()
{
    firstNum = getInput(); 
    console.log('firstNum ' + firstNum); 
}

function storeSecondNum()
{
    secondNum = getInput();
    console.log('secondNum ' + secondNum);
}


function prepareForCalculation(operator)
{
    console.log("prepareForCalculation");
    switch(calculatorState)
    {
        case CalculatorState.waitingForFirstNum:
            console.log(calculatorState.name);
            waitingForFirstNum();
            break;
        case CalculatorState.gettingFirstNum:
            console.log(calculatorState.name);
            gettingFirstNum(operator);
            console.log(calculatorState.name);
            break;
        case CalculatorState.waitingForSecondNum:
            console.log(calculatorState.name);
            waitingForSecondNum();
            console.log(calculatorState.name);
            break;
        case CalculatorState.secondNumReady:
            console.log(calculatorState.name);
            secondNumberReady(operator);
            console.log(calculatorState.name);
            break;
    }
}

function waitingForFirstNum()
{
    alert("Error waiting For firstNumber");
}

function gettingFirstNum(operator)
{    
    if(operator == '=')
    {
        alert('Error could not calculate');
        return;
    }        
    currentOperator = operator;
    decimalEntered = false;
    console.log('decimalEntered : ' + decimalEntered);
    storeFirstNum();
    updateDisplay(operator, false);

    tempValue = '';  
    console.log('tempValue ' + tempValue);
    calculatorState = CalculatorState.waitingForSecondNum;
}

function waitingForSecondNum()
{
    alert("Error waiting For secondNumber");
}

function secondNumberReady(operator) //This state will have two conditons depends on the user who enters equal sign or not. If equal sign is entered.....
{
    storeSecondNum(); 
    if(operator != '=') //if user want to calculate more than two operands
    {               
        calculate(currentOperator);
        currentOperator = operator; //currentOperator assignment should not happen before calling calculate function
        decimalEntered = false;
        tempValue = '';  // This is so important that resetting this value is required to store the next operand properly 
        console.log('tempValue ' + tempValue);
        updateDisplay(operator, false);
        calculatorState = CalculatorState.waitingForSecondNum;
    }
    else
    {
        calculate(currentOperator);
        if(isDecimal(result + ''))
            decimalEntered = true;
        else
            decimalEntered = false;
        calculatorState = CalculatorState.gettingFirstNum;
    }

    console.log('decimalEntered : ' + decimalEntered);
}

function calculate(operator)
{
    result = 0;
    console.log('calculate ' + operator);
    switch(operator)
    {
        case ' + ':
            result = firstNum + secondNum;
            break;
        case ' - ':
            result = firstNum - secondNum;
            break;
        case ' * ':
            result = firstNum * secondNum;
            break;
        case ' / ':
            result = firstNum / secondNum;
            break;
    }

    if(isDecimal(result + ''))
    {
        var fixedVal; 
        fixedVal = result.toFixed('3');
        result = fixedVal; // The real value has changed here
    }


    console.log('result ' + result);
    console.log( 'decimal ' + isDecimal(result + ''));


    tempValue = result + '';
    console.log('tempValue ' + tempValue);
    storeFirstNum();
    updateDisplay(result, true);

}

function updateDisplay(value, clearBeforeShowing)
{
    var display = document.getElementById('userinput');
    if(clearBeforeShowing)
        display.value = '';
    display.value += value;
}

function reset()
{
    updateDisplay('', true);
    setUp();
    //tempValue = '0';

    console.log('tempValue ' + tempValue);

    console.log('decimalEntered : ' + decimalEntered);
    console.log('firstNum ' + firstNum);
    console.log('secondNum ' + secondNum);
    console.log('tempValue ' + tempValue);
    //calculatorState = CalculatorState.waitingForFirstNum;
}