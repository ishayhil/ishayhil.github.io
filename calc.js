var calcHistory = {};
let replacements = {
    "log": "logBase",
    "E"  : "Math.E",
    "PI" : "Math.PI",
    "ceil": "Math.ceil",
    "floor": "Math.floor"
}

function logBase(base, val) {
    if (val) {
        return Math.log(val) / Math.log(base);
    }
    return Math.log(base);
}

function saveCalc() {
    let commentNode = document.getElementById("comment");
    let comment = commentNode && commentNode.value;
    commentNode.value = "";
    calcHistory[Object.keys(calcHistory).length] = {
        input: document.getElementById("input").value,
        output: document.getElementById("output").value,
        comment: comment
    };
    reWriteHistory();
}

function reWriteHistory() {
    var historyNode = document.getElementById("history");
    if (historyNode) {
        document.body.removeChild(historyNode);
    }
    let div = document.createElement("div");
    div.id = "history";
    Object.keys(calcHistory).forEach(key => {
        let div2 = document.createElement("div");
        let dict = calcHistory[key];

        div2.innerText = (parseInt(key)+1) + ") Formula: " + dict.input + "\t" + ", Result: " + dict.output +
            (dict.comment ? " - " + dict.comment : "");
        div.appendChild(div2);
    })
    document.body.appendChild(div);
}

function enterInputFunc(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("saveCalcButton").click();
    }
}

function onChange(e) {
    try {
        var formula = e.target.value;
        var result = evalResult(formula);
        if (result === false) {
            return;
        }
        result = result || 0;
        if (typeof result === "number") {
            document.getElementById("output").value = parseInt(result) === result ? result : result.toFixed(3);
        }
    } catch(e) {
    }
}

function evalResult(formula) {
    try {
        Object.keys(replacements).forEach((key) => {formula = formula.replaceAll(key, replacements[key])});
        return eval(formula);
    } catch(e) {
        return false;
    }
}

function resetHistory() {
    calcHistory = {};
    reWriteHistory();
}