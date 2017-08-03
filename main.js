var fetch = require('isomorphic-fetch');
var cN = {
    min: 1, //Start of the number range
    max: 1000000, //End of the number range
    sum: 0, //Sum of all cool numbers
    allRequests: [], //Array for all success requests
};


//Sort by cool number
function sortCN(num) {

    var strNum = String(num).split("");
    var result = 0;

    for (var i = 0; i < strNum.length; i++) {
        result += strNum[i]*strNum[i];
    }
    //Determining what a number
    if (result === 1) {
        return true;
    } else if (result === 4) {
        return false;
    } else {
        return sortCN(result);
    }
}


//create sum of all cool numbers
for (var i = cN.min; i <= cN.max; i++) {
    sortCN(i) ? cN.sum += i : 0;
}

console.log('Sum of all cool numbers = ' + cN.sum);

//create array with all api requests
for (var i = 1; i <= 100; i++) {

    cN.allRequests.push(
        fetch('http://dev.getethos.com/code' + i, {

            method: "post",
            headers: {"X-COOL-SUM": cN.sum}

        }).then(function (res) {
            //if the request successful, return the text
            if (res.status === 200) return res.text()

        }, function (err) {
            console.log(new Error(err))
        }))
}

//when all requests is done , we will get info
Promise.all(cN.allRequests).then(function (res) {
    console.log('Secret code = ' + res.join(''));
})





