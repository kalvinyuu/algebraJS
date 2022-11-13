let results = [['4', '-5x'], ['4', '-4x']]

function parser(index, arr, currentArr) {
    for(let i = 0; i < results.length-1; i++){ // loops result except last
	currentArr = results[i]
	for(let j=1; j < results.length; j++){ // loops result except first
	    arr = results[j]
	    for(let count = 0; count < currentArr.length; count ++) { // loops currentArr
		index = currentArr[count]
		worker(arr, index)
	    }
	}
    }
}
function worker(array, num) {
    const returnNum = (element) => parseFloat(element); 
    let arrNum = array.map(returnNum) // filters floats from array
    let numNum = parseFloat(num) // filters floats from num
    arrNum = arrNum.map(x => x * numNum) // multiplies the array
    num = num.split(returnNum) // removes number from num
    for(let I = 0; I < array.length; I++) {
	X = array[I]
	X = X.split(returnNum) //removes numbers from array
    }
    array = array.map(x => x + num) //concatinates the letters from num to array if any
    console.log(array)
 }

parser()
