let timesPressed = 0

function pressButton(){
    let timesElement = document.getElementById('times-pressed')
    timesPressed = timesPressed + 1
    timesElement.innerText = timesPressed
}

function resetButton(){
    let timesElement = document.getElementById('times-pressed')
    timesPressed = 0
    timesElement.innerText = timesPressed
}