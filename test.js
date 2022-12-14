function trigger() {
    let eq = 'blank';
    //general HTML to JS pre wiring
    function show() {
        const recent = document.querySelector("ol");
        const txt = document.getElementById('input');
        eq = txt.value;
        let li = document.createElement('li');
        li.innerText = eq;
        recent.appendChild(li);
        txt.value = '';
    }
    ;
    show();
    //brackets
    class subEqCreator {
        text;
        precede;
        constructor() {
            this.text = '';
            this.precede = 0;
        }
        parser() {
            this.text += eq[counter];
        }
    }
    ;
    let bracketNum = 0;
    let counter = 0;
    let pre = 0;
    let eqObjs = [];
    let algSyms = [];
    function expForm(x) {
        for (let i = 0; i < x.length; i++) {
            let a = x[i].search(/[a-zA-z]/);
            function part1() {
                let b = x[i].charAt(a);
                let c = x[i].split(b).length - 1;
                if (c > 1) {
                    let str = `${b}**${c}`;
                    let d = b.repeat(c);
                    x[i] = x[i].replace(d, str);
                    a += str.length;
                }
            }
            part1();
            if (a < x[i].length) {
                for (a; a < x[i].length; a++) {
                    if ((/A-Za-z/).test(x[a])) {
                        part1();
                    }
                }
            }
        }
    }
    const letterRe = /([A-Za-z]+(\*{2}[0-9]+)([A-Za-z]*(\*{2}[0-9]+)*)*)|[A-Za-z]+/g;
    function regexPush(x) {
        for (const v of x.match(letterRe)) {
            if (algSyms.includes(v) == false) {
                algSyms.push(v);
            }
        }
    }
    function brackets() {
        for (let i = 0; i < eq.length; i++) {
            if (eq[i] == "(") {
                bracketNum++;
            }
            ;
            /*  if (letterRe.test(eq[i])) {
                  if (algSyms.includes(eq[i]) == false) {
                      algSyms.push(eq[i])
                  }
              };*/
        }
        ;
        regexPush(eq);
    }
    ;
    brackets();
    //brackets organiser
    let subEqDynamic = function () {
        for (let count = 0; count <= bracketNum; count++) {
            this['subEq' + count] = new subEqCreator();
            eqObjs.push(this['subEq' + count]);
        }
        ;
    };
    subEqDynamic();
    function parseEquation() {
        let nextIndex = 0;
        let currentIndex = 0;
        let lastIndex = [0];
        let eqLen = eq.length;
        for (counter; counter < eqLen; counter++) {
            if (eq[counter] == "(") {
                nextIndex++;
                pre++;
                this['subEq' + currentIndex].text += '( )';
                this['subEq' + nextIndex].precede = pre;
                lastIndex.push(currentIndex);
                currentIndex = nextIndex;
            }
            else if (eq[counter] == ")") {
                pre--;
                currentIndex = lastIndex.pop();
            }
            else {
                this['subEq' + currentIndex].parser();
            }
        }
    }
    parseEquation();
    function objectPutter() {
        for (let i = 0; i < bracketNum; i++) {
            if (this['subEq' + i].text.includes('( )')) {
                this['subEq' + i].text = this['subEq' + i].text.split(' '); // why isnt it working here
                let p = 1;
                for (let j = 1; j < this['subEq' + i].text.length; j += 2) { // ???? for loop generates only odds
                    let ni = i + p;
                    this['subEq' + i].text.splice(j, 0, this['subEq' + ni].text);
                    p++;
                }
            }
        }
    }
    objectPutter();
    function crossMultiplier() {
        let temp = [];
        let aSymbolsTemp = [];
        eqObjs.sort((a, b) => b.precede - a.precede);
        let topPrec = eqObjs[0].precede;
        let result = eqObjs.filter(limit => limit.precede == topPrec);
        result.forEach((element, i) => {
            element = element.text.split(/(\+\w*|\-\w*)/);
            element = element.filter(e => e);
            result[i] = element;
        });
        function parser() {
            for (let i = 0; i < result.length - 1; i++) { // loops result except last
                let currentArr = result[i];
                for (let j = 1; j < result.length; j++) { // loops result except first
                    let arr = result[j];
                    for (let count = 0; count < currentArr.length; count++) { // loops currentArr
                        let index = currentArr[count];
                        worker(arr, index);
                    }
                }
            }
        }
        parser();
        function worker(array, num) {
            const returnNum = (element) => parseFloat(element);
            let nNum = 0;
            let aNum = [];
            let aSymbols = [];
            function fArrNum() {
                aNum = array.map(returnNum);
                aNum.forEach((element, index) => {
                    if (isNaN(element)) {
                        aNum[index] = array[index].replace(/[A-Za-z]+/g, '1');
                    }
                });
            }
            fArrNum();
            nNum = parseFloat(num); // remove letters from num
            if (isNaN(nNum)) {
                if (num[0] == '-') {
                    nNum = -1;
                }
                else
                    nNum = 1;
            }
            aNum = aNum.map(x => x * nNum); // multiplies arrNum by numNum
            temp.push(aNum);
            //deals with aSymbols from here on!
            num = num.split(parseFloat(num) || /\-|\+/);
            num = num.join(''); // removes number from num
            aSymbols = array.map(x => x.split(parseFloat(x) || /\-|\+/));
            aSymbols = aSymbols.map(x => x.join(''));
            aSymbols = aSymbols.flat();
            aSymbols = aSymbols.map(x => x + num); //concatinates the letters from num 
            aSymbolsTemp.push(aSymbols);
        }
        aSymbolsTemp = aSymbolsTemp.flat();
        temp = temp.flat();
        for (let i = 0; i < temp.length; i++) { //i could easily make a function for this
            temp[i] += aSymbolsTemp[i];
        }
        regexPush(temp.toString());
        expForm(temp);
        console.log(temp);
        console.log(aSymbolsTemp);
        expForm(algSyms);
        console.log(algSyms);
        function compareNPush(x, y) {
            for (let i = 0; i < x.length; i++) { //i could easily make a function for this
                if (x[i].length > 0) {
                    if (y.includes(x[i]) == false) {
                        y.push(aSymbolsTemp[i]);
                        console.log(y);
                    }
                }
            }
        }
    }
    crossMultiplier();
}
;
