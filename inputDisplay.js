let eq
let x = null
let bracketNum = 0
let k = 0
let pre = 0

class subEqCreator {
    constructor() {
	this.precede = 0;
	this.string = '';
    }
    parser() {
	this.string += eq[k]
    }
};
function trigger() {
    show();
    brackets();
    subEqDynamic()
    parseEquation();
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
function brackets() {
    for (let i = 0; i < eq.length; i++) {
	if (eq[i] == "(") {
	    bracketNum++;
	};
    };
};
let subEqDynamic = function() {
    for (let count = 0; count <= bracketNum; count++) {
        this['subEq' + count] = x =  new subEqCreator() 
    };
};
function parseEquation() {
    let nextIndex = 0; 
    let currentIndex = 0; 
    let lastIndex = [0]; 
    let eqLen = eq.length;
    let nex = this['subEq' + nextIndex]
    
    for (k; k < eqLen; k++) {           
        if (eq[k] == "(") {          
            nextIndex++;
	    pre++
            this['subEq' + currentIndex].string += '()';
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
