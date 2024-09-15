//constant that selects puzzle
const puzzleBoard = document.querySelector('#puzzle')
//CONST ALLOWS PUZZLEBOARD AND SOLVE BUTTON TO BE VARIABLES ATHAT ARE NOW SAVED AND CAN BE ACCESSED LATER. 
// This means that while you can change the contents
// or properties of the object that puzzleBoard points to, you cannot reassign 
//puzzleBoard to reference a different object.

//document.querySelector.is a method call that searches the DOM (Document Object Model) for the
// first element that matches the specified CSS selector.
//document: This represents the entire HTML document loaded in the browser.
//.querySelector('#puzzle'):
//.querySelector() is a method that returns the first element within the document that matches the specified selector. If no matching element is found, it returns null.
//'#puzzle' is the selector being used in this case. The # symbol indicates that you are looking for an element with an id of "puzzle".
const solveButton = document.querySelector('#solve-button')
//constant that slescts the button

const squares = 81
//number of squares in sudoku and how big it is 9 by 9 grid
const submission = []
// submitting gives you an array.

const solutionDisplay = document.querySelector('#solution')

//creatign square with forloop
for (let i = 0; i < squares; i++) {
   //for all 81 times I want to create an element
  const inputElement =  document.createElement('input') 
  
  //set attributes to sedoku : type is number, min as 1 and max as 9; these are strings
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('min','1')
  inputElement.setAttribute('max','9')
  ////////adding color
  if(
    ///////if number is divisible by nin and is  true then color will be added
    ((i % 9 ==0))
  ) { 
    inputElement.classList.add('odd-selection')
  }
  puzzleBoard.appendChild(inputElement)
} 
//get all the values from inputs and changer them int o an array

const joinValues = () => {
    //select all the inputs elements; name varaible inputs
    const inputs = document.querySelectorAll('input')
//for each input element you get an if statement
//if the input value exists, 
//then it will be put into an array. 
//else
//if it doesn't exisit, then it will just be an empty square.
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        
        } else {
            submission.push('.')
        }
    })
    console.log(submission)

}
////add the new funciton 
//////const populateValues = (response) => {
/////changedto isSolvable after adding response.data.solvabl, response. data.solution to populate value atthe bottom (line 106)
const populateValues = (isSolvable, solution) => {
    ////putting all the inputs back in the function so its like the others 
    const inputs = document.querySelectorAll('input')
////if reponse is solvable/ true, and there is a solution, then we want to get eac hinput//
//////if (response.solvable && response.solution) {
    ///////changed to shorten the amount tof times written
    if (isSolvable && solution) {
    /////for each input value, we are going to 
            inputs.forEach((input, i) => {
        ////for each input value, we
            input.value = solution[i]
         })
         solutionDisplay.innerHTML = 'This is the answer!'
        } else {
            solutionDisplay.innerHTML = 'This is NOT solvable'
         }
    }



//we also want to calling the api
const solve = () => {
    //taken out after inserting script in html
    //const axios = require("axios").default;
    
    /// when I click solve call the jointValues function 
    joinValues()
    ///get the submissions and use the javascript method od join to join the submissions
   ///make it a varaiable 
   const data =  submission.join('')
   ///be able to see what we called in data snd give you data
   console.log('data', data)

    const options = {
        method: 'GET',
        url:'https://sudoku-solver20.p.rapidapi.com/SudokuSolver?row1=4%2C-%2C-%2C-%2C-%2C-%2C-%2C-%2C-&row2=-%2C2%2C-%2C-%2C-%2C4%2C1%2C-%2C-&row3=-%2C8%2C-%2C-%2C5%2C-%2C-%2C2%2C-&row4=-%2C6%2C-%2C7%2C-%2C1%2C-%2C8%2C-&row5=5%2C-%2C1%2C-%2C6%2C-%2C9%2C-%2C-&row6=-%2C-%2C-%2C4%2C-%2C5%2C-%2C-%2C-&row7=-%2C9%2C-%2C-%2C7%2C-%2C-%2C-%2C-&row8=2%2C-%2C8%2C-%2C-%2C6%2C7%2C5%2C-&row9=-%2C5%2C-%2C-%2C2%2C-%2C-%2C-%2C3',
        headers:{ 
             'content-type': 'application/json',
         'x-rapidapi-host': 'sudoku-solver20.p.rapidapi.com', 
          'x-rapidapi-key' : 'b64b2ee461msh6279391caac3b76p159bb4jsn5a842d1c00b8'
    },
    data: {
        puzzle: 
        //replace '{"board":[[5,0,0,0,9,0,0,0,0],[7,9,0,0,0,0,0,0,8],[0,6,0,8,0,0,0,2,5],[9,0,6,0,0,5,0,0,0],[0,0,0,0,0,0,0,4,0],[0,0,0,0,7,1,0,0,0],[0,7,3,0,0,0,4,5,0],[0,0,4,0,6,0,2,0,0],[0,0,0,2,0,0,8,0,0]]}' iwth data
        data
    }
};
//--header '' \
	//--header 'x-rapidapi-host: solve-sudoku.p.rapidapi.com' \
	//--header 'x-rapidapi-key: b64b2ee461msh6279391caac3b76p159bb4jsn5a842d1c00b8' \ '6835772f3emsh8dbf271d59b19eep132ed4jsndd22b502a839' 
	//--data '{"0":"{","1":"\"","2":"p","3":"u","4":"z","5":"z","6":"l","7":"e","8":"\"","9":":","10":" ","11":"\"","12":"2","13":".","14":".","15":".","16":".","17":".","18":".","19":".","20":".","21":".","22":".","23":".","24":".","25":".","26":"6","27":"2","28":".","29":".","30":".","31":".","32":"1","33":".","34":".","35":".","36":".","37":"7","38":".","39":".","40":".","41":"6","42":".","43":".","44":"8","45":".","46":".","47":".","48":"3","49":".","50":".","51":".","52":"9","53":".","54":".","55":".","56":"7","57":".","58":".","59":".","60":"6","61":".","62":".","63":"4","64":".","65":".","66":".","67":"4","68":".","69":".","70":".","71":".","72":"8","73":".","74":".","75":".","76":".","77":"5","78":"2","79":".","80":".","81":".","82":".","83":".","84":".","85":".","86":".","87":".","88":".","89":".","90":".","91":".","92":"3","93":"\"","94":"}"}'

//there is a button that will listen. If I click the button then it will call back the joinValues
axios.request(options).then((response)=> {
    console.log(response.data);
    ////we need to get the solution here 
    ////we want to populate the values
    populateValues(response.data.solvable, response.data.solution) 
}).catch((error) => {
    console.error(error);
});
}

solveButton.addEventListener('click', solve)


//method: 'GET',
      //  url:'https://sudoku-solver20.p.rapidapi.com/SudokuSolver?row1=4%2C-%2C-%2C-%2C-%2C-%2C-%2C-%2C-&row2=-%2C2%2C-%2C-%2C-%2C4%2C1%2C-%2C-&row3=-%2C8%2C-%2C-%2C5%2C-%2C-%2C2%2C-&row4=-%2C6%2C-%2C7%2C-%2C1%2C-%2C8%2C-&row5=5%2C-%2C1%2C-%2C6%2C-%2C9%2C-%2C-&row6=-%2C-%2C-%2C4%2C-%2C5%2C-%2C-%2C-&row7=-%2C9%2C-%2C-%2C7%2C-%2C-%2C-%2C-&row8=2%2C-%2C8%2C-%2C-%2C6%2C7%2C5%2C-&row9=-%2C5%2C-%2C-%2C2%2C-%2C-%2C-%2C3',
      //  headers:{ 
      //      'content-type': 'application/json',
       // 'x-rapidapi-host': 'sudoku-solver20.p.rapidapi.com', 
       // 'x-rapidapi-key' : 'b64b2ee461msh6279391caac3b76p159bb4jsn5a842d1c00b8'