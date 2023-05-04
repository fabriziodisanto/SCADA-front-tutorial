function getAllPlayersFail() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("all-players-fail").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "http://localhost:5000/players", true);
    xhttp.send();
}

function getAllPlayers() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let players = JSON.parse(xhttp.response)
            let playersDiv = document.getElementById("all-players")
            removeChildren(playersDiv)
            for (let player of players) {
                let playerP = document.createElement('p')
                playerP.innerHTML = `${player.first_name} ${player.last_name}`
                playersDiv.appendChild(playerP)
            }
        }
    };
    xhttp.open("GET", "http://localhost:5000/players", true);
    xhttp.send();
}

function getPlayersFromClub() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let players = JSON.parse(xhttp.response)
            let playersDiv = document.getElementById("club-players")
            removeChildren(playersDiv)
            for (let player of players) {
                let playerP = document.createElement('p')
                playerP.innerHTML = `${player.first_name} ${player.last_name}`
                playersDiv.appendChild(playerP)
            }
        }
    };
    let clubValue = document.getElementById("club-input")
    xhttp.open("GET", `http://localhost:5000/players/club/${clubValue.value}`, true);
    xhttp.send();
}

function addPlayer() {
    let xhttp = new XMLHttpRequest();
    let firstNameValue = document.getElementById("fname")
    let lastNameValue = document.getElementById("lname")
    let countryValue = document.getElementById("country")
    let clubValue = document.getElementById("club")

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            firstNameValue.value = ''
            lastNameValue.value = ''
            countryValue.value = ''
            clubValue.value = ''
        }
    };
    xhttp.open("POST", "http://localhost:5000/players", true);
    let data = {
        first_name: firstNameValue.value,
        last_name: lastNameValue.value,
        country: countryValue.value,
        club: clubValue.value,
    }
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

function generateRandomData() {
    let xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let plcDiv = document.getElementById("plc-data")
            removeChildren(plcDiv)
            loadLastData()
        }
     }
    xhttp.open("POST", "http://localhost:5000/plc/values", true);
    xhttp.send();
}

function loadLastData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let lastValue = JSON.parse(xhttp.response)
            let lastValueDiv = document.getElementById("last-value")
            lastValueDiv.innerHTML = lastValue
        }
    };
    xhttp.open("GET", "http://localhost:5000/plc/values/last", true);
    xhttp.send();
}

function formatValues(values) {
    // data: [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 8},{x: 4, y: 16}],
    let data = []
    for (let i = 0; i < values.length; i++) {
        data.push({x: i, y: values[i]})
    }
    return data
}

let plcGraph = null

function loadHistoricalData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let values = JSON.parse(xhttp.response)
            if (plcGraph) {
                plcGraph.destroy()
            }
            let plcGraphDiv = document.getElementById("plc-data")
            values = formatValues(values)
            plcGraph = new Chart(plcGraphDiv, {
              type: 'scatter',
              data: {
                datasets: [
                    {
                    label: 'Temperatura',
                    data: values,
                    showLine: true,
                    fill: false,
                    borderColor: 'rgba(0, 200, 0, 1)'
                    },
                ]
              },
            });
        }
    };
    xhttp.open("GET", "http://localhost:5000/plc/values/historical", true);
    xhttp.send();
}


function removeChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.lastChild);
    }
}