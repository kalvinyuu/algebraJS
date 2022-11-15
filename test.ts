function trigger() { //used for HTML onClick method
    let eq = 'blank'
    //general HTML to JS pre wiring

    function show() {
        const recent = document.querySelector("ol");
        const txt = document.getElementById('input') as HTMLInputElement;
        eq = txt.value;
        let li = document.createElement('li');
        li.innerText = eq;
        recent.appendChild(li);
        txt.value = '';
    };
    show();

    //brackets
    class subEqCreator { //subEq object
        text: string;
        precede: number
        constructor() {
            this.text = '';
            this.precede = 0;
        }
        parser() {
            this.text += eq[z]
        }
    };

    let bracketNum = 0
    let z = 0
    let pre = 0
    let eqObjs: subEqCreator[] = []

    function brackets() { //counts how many brackets appear
        for (let i = 0; i < eq.length; i++) {
            if (eq[i] == "(") {
                bracketNum++;
            };
        };
    };
    brackets();
    //brackets organiser
    let subEqDynamic = function() { // creates a new object for each bracket
        for (let count = 0; count <= bracketNum; count++) {
            this['subEq' + count] = new subEqCreator()
            eqObjs.push(this['subEq' + count])
        };
    };
    subEqDynamic();
    function parseEquation() { // assign characters to SubEq object
        let nextIndex = 0;
        let currentIndex = 0;
        let lastIndex = [0];
        let eqLen = eq.length;
        for (z; z < eqLen; z++) {
            if (eq[z] == "(") {
                nextIndex++;
                pre++
                this['subEq' + currentIndex].text += '( )';
                this['subEq' + nextIndex].precede = pre;
                lastIndex.push(currentIndex);
                currentIndex = nextIndex;
            }
            else if (eq[z] == ")") {
                pre--
                currentIndex = lastIndex.pop();
            }
            else {
                this['subEq' + currentIndex].parser()
            }
        }
    }
    parseEquation();

    function objectPutter() {
        for (let i = 0; i < bracketNum; i++) {

            if (this['subEq' + i].text.includes('( )')) {
                this['subEq' + i].text = this['subEq' + i].text.split(' '); // why isnt it working here
                let p = 1
                for (let j = 1; j < this['subEq' + i].text.length; j += 2) {// 🚩 for loop generates only odds
                    let ni = i + p
                    this['subEq' + i].text.splice(j, 0, this['subEq' + ni].text)
                    p++
                }
            }
        }
    }
    objectPutter();
    function crossMultiplier() {
        eqObjs.sort((a, b) => b.precede - a.precede)
        let topPrec = eqObjs[0].precede
        let result = eqObjs.filter(limit => limit.precede == topPrec)
        result.forEach((element: subEqCreator | any, i) => {
            element = element.text.split(/(\+\w*|\-\w*)/)
            element = element.filter(e => e)
            result[i] = element
        })
        function parser() {
            for (let i = 0; i < result.length - 1; i++) { // loops result except last
                let currentArr: subEqCreator | any = result[i]
                for (let j = 1; j < result.length; j++) { // loops result except first
                    let arr = result[j]
                    for (let count = 0; count < currentArr.length; count++) { // loops currentArr
                        let index = currentArr[count]
                        worker(arr, index)
                    }
                }
            }
        }
        parser()
        function worker(array:, num) {
            const returnNum = (element) => parseFloat(element);
            let arrNum = array.map(returnNum) // remove letters from arr 
            let numNum = parseFloat(num) // remove letters from num
            arrNum = arrNum.map(x => x * numNum) // multiplies the array
            num = num.split(returnNum) // removes number from num
            if (/(\+\w*|\-\w*)/.test(num)) {
                num = num.toString()
                num.replace(/(\+\w*|\-\w*)/, /(\+1\w*|\-1\w*)/)
            }
            for (let I = 0; I < array.length; I++) {
                let X = array[I]
                X = X.split(returnNum) //removes numbers from array
                if (/(\+\w*|\-\w*)/.test(X)) {
                    X = X.toString()
                    X.replace(/(\+\w*)/, /(\+1\w*)/)
                    X.replace(/(\-\w*)/, /(\-1\w*)/)
                    console.log(X)
                }
            }
            array = array.map(x => x + num) //concatinates the letters from num to array if any
            //console.log(array)
            console.log(arrNum)
        }

    }
    crossMultiplier();
};
