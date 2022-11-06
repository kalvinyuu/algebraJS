let eq
let x = null
let bracketNum = 0
let k = 0
let pre = 0

class subEqCreator { //subEq object
    constructor() {
	this.text = '';
	this.precede = 0;
    }
    parser() {
	this.text += eq[k]
    }
    ma(){
	this.text.split(' ')
    }    
};
function trigger() { //used for HTML onClick method
    show();
    brackets();
    subEqDynamic()
    parseEquation();
    objectPutter()
};
function show() {
    const recent = document.querySelector("ol");
    const txt = document.getElementById('input');  
    eq = txt.value;
    li = document.createElement('li');
    li.innerText = eq;
    recent.appendChild(li);    
    txt.value = '';
};
function brackets() { //counts how many brackets appear
    for (let i = 0; i < eq.length; i++) {
	if (eq[i] == "(") {
	    bracketNum++;
	};
    };
};
let subEqDynamic = function() { // creates a new object for each bracket
    for (let count = 0; count <= bracketNum; count++) {
        this['subEq' + count] = x =  new subEqCreator() 
    };
};
function parseEquation() { // assign characters to SubEq object
    let nextIndex = 0; 
    let currentIndex = 0; 
    let lastIndex = [0]; 
    let eqLen = eq.length;
    let nex = this['subEq' + nextIndex]
    
    for (k; k < eqLen; k++) {           
        if (eq[k] == "(") {          
            nextIndex++;
	    pre++
            this['subEq' + currentIndex].text += '( )';
	    this['subEq' + nextIndex].precede = pre;
            lastIndex.push(currentIndex);
            currentIndex = nextIndex;
        }
        else if (eq[k] == ")") {
	    pre--
	    currentIndex = lastIndex.pop();
        }
        else {          
	    this['subEq' + currentIndex].parser()
        }       
    }    
}


function objectPutter() { 
    for(let i = 0; i < bracketNum; i++) {
	if ( this['subEq' + i].text.includes('( )')) {
	    
	    //	let wowza = this['subEq' + i].text
	    this['subEq' + i].text = this['subEq' + i].text.split(' '); // why isnt it working here
	    console.log(this['subEq' + i]);
	    let p = 1
	    for(let j = 1; j < this['subEq' + i].text.length; j+=2) {// 🚩 for loop generates only odds
		console.log(i)
		let ni = i + p
		this['subEq' + i].text.splice(j, 0, this['subEq' + ni].text)
		p++
	    }
	}
    } 
}
