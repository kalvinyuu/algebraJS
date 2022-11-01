function trigger() {
    let userInput;
    show();
    parser();
};
function show() {
    const recent = document.querySelector("ol");
    const txt = document.getElementById('input');  
    userInput = txt.value;
    li = document.createElement('li');
    li.innerText =  userInput;
    recent.appendChild(li);    
    txt.value = '';
};
function parser() {
    const display = document.getElementById("display");
    let equation;
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    letters = letters.split('');
    let opening = [];
    let holder = [''];
   if (/=(?=\w)/.test(userInput)) {}
    else {
    userInput += "=0";
    }
    display.value = userInput;
    equation = userInput.split('')

    
    /*  const bracketsMarker = () => {
        equation.forEach((element, index) => {
        if (element == '(') {
        opening.unshift(index);
        }
        });
        opening.push(0);
        letters.length = opening.length;
        console.log(equationArr);
        console.log(opening);
	};*/
    
    function parserBrackets() {
	let nextVar = 0;
	let currentVar = 0;
	let prev = [0]
	equation.forEach((element, index) => {
	    let i = equation[index];

	    if (i == '(') {
		if (holder.length -1 < currentVar) {
		    holder.push('')
		}
		nextVar++;
		holder[currentVar] += '[' + nextVar + ']';
		prev.push(currentVar);
		currentVar = nextVar;
	    }
	    
	    else if ( i == ')') {
		currentVar = prev.pop();
		
	    }
	    else {
		if (holder.length -1 < currentVar) {
		    holder.push('');
		}
		holder[currentVar] += i;
	    }
	});
	console.log(holder.length)
	return holder
    }
    
    let vars = function () {
        for(let count = 0; count <= holder.length; count++) {
            eval('let LHS ' + count + ' = ' + holder[count] + ';' );
	  
        };
    }
    // bracketsMarker();
    parserBrackets();
    vars();q
    //equation = userInput.split('=')    //var LHS = equation.slice(0, 1),
      //  RHS = equation.slice(1);
    //equation = [LHS, RHS];
    //equation.join(=)

 };
