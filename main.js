let timesPressed = 0

function pressButton(){
    let timesElement = document.getElementById('cantidad-veces-apretado')
    timesPressed = timesPressed + 1
    timesElement.innerText = timesPressed
    if (timesPressed > 10) {
        timesElement.style = 'color: red;'
    }
}

function resetButton(){
    let timesElement = document.getElementById('cantidad-veces-apretado')
    timesPressed = 0
    timesElement.innerText = timesPressed
    timesElement.style = 'color:black;'
}
